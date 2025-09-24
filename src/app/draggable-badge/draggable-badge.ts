import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { BadgeService, BadgeData } from "src/app/services/badge-service";
import type { EventData } from "../event-module/event-card/event-card";
import type { Subscription } from "rxjs";

@Component({
  selector: "app-draggable-badge",
  templateUrl: "./draggable-badge.html",
  styleUrls: ["./draggable-badge.scss"],
  standalone: false
})
export class DraggableBadgeComponent implements OnInit, OnDestroy {
  @Input() eventData: EventData | null = null;
  @Input() initialPosition: { x: number; y: number } = { x: 20, y: 100 };
  @Output() positionChange = new EventEmitter<{ x: number; y: number }>();

  isVisible = false;
  position = { x: 20, y: 100 };

  private isDragging = false;
  private dragOffset = { x: 0, y: 0 };
  private startPoint?: { x: number; y: number };
  private moved = false;
  private suppressNextClick = false; // evita doppio trigger (manuale + (click))

  private badgeSubscription?: Subscription;

  constructor(
    private router: Router,
    private badgeService: BadgeService,
  ) {}

  ngOnInit() {
    this.badgeSubscription = this.badgeService.badge$.subscribe((badgeData: BadgeData) => {
      this.isVisible = badgeData.isVisible;
      this.eventData = badgeData.eventData;
      if (badgeData.position) this.position = { ...badgeData.position };
    });

    if (this.initialPosition) this.position = { ...this.initialPosition };

    // Listener globali pointermove/up (una sola volta)
    document.addEventListener("pointermove", this.onPointerMove, { passive: false });
    document.addEventListener("pointerup", this.onPointerUp, { passive: true });
    document.addEventListener("pointercancel", this.onPointerUp, { passive: true });
  }

  ngOnDestroy() {
    this.badgeSubscription?.unsubscribe();
    document.removeEventListener("pointermove", this.onPointerMove as any);
    document.removeEventListener("pointerup", this.onPointerUp as any);
    document.removeEventListener("pointercancel", this.onPointerUp as any);
  }

  onPointerDown = (ev: PointerEvent) => {
    const target = ev.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    // calcola offset iniziale
    this.dragOffset.x = ev.clientX - rect.left;
    this.dragOffset.y = ev.clientY - rect.top;
    this.startPoint = { x: ev.clientX, y: ev.clientY };
    this.moved = false;
    this.isDragging = true;

    // cattura tutti i successivi pointer events anche fuori dal badge
    target.setPointerCapture?.(ev.pointerId); // Safari iOS 13+ supporta Pointer Events. :contentReference[oaicite:3]{index=3}
  };

  onPointerMove = (ev: PointerEvent) => {
    if (!this.isDragging) return;

    // blocca lo scroll mentre trascini (consentito perché abbiamo touch-action:none)
    ev.preventDefault();

    const nextX = ev.clientX - this.dragOffset.x;
    const nextY = ev.clientY - this.dragOffset.y;

    // soglia per distinguere tap da drag (anti-jitter)
    if (!this.moved && this.startPoint) {
      const dx = Math.abs(ev.clientX - this.startPoint.x);
      const dy = Math.abs(ev.clientY - this.startPoint.y);
      this.moved = Math.hypot(dx, dy) > 6;
    }

    this.position.x = nextX;
    this.position.y = nextY;
    this.constrainPosition();
    this.positionChange.emit({ ...this.position });
  };

  onPointerUp = (_ev: PointerEvent) => {
    if (!this.isDragging) return;

    // se non si è mosso abbastanza, trattalo come tap e invoca onClick
    if (!this.moved) {
      this.suppressNextClick = true; // evitiamo doppio trigger con il (click) del template
      this.onClick();
    }

    this.isDragging = false;
    this.startPoint = undefined;
    this.moved = false;
  };

  constrainPosition() {
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    this.position.x = Math.max(0, Math.min(this.position.x, maxX));
    this.position.y = Math.max(0, Math.min(this.position.y, maxY));
  }

  onClick() {
    // se abbiamo già generato il click manualmente da pointerup, non ripeterlo
    if (this.suppressNextClick) {
      this.suppressNextClick = false;
      return;
    }
    this.router.navigate(['/events-search/real-time-stats-notify']);
  }
}
