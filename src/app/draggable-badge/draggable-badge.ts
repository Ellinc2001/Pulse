import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild } from "@angular/core";
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

  @ViewChild('badgeRef', { static: true }) badgeRef!: ElementRef<HTMLElement>;
  @ViewChild('popoverRef', { static: true }) popoverRef!: ElementRef<HTMLElement>;

  isVisible = false;
  position = { x: 20, y: 100 };
  isPopoverVisible = false;
  popoverPosition = { x: 0, y: 0 };

  private isDragging = false;
  private dragOffset = { x: 0, y: 0 };
  private startPoint?: { x: number; y: number };
  private moved = false;

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

    document.addEventListener("pointermove", this.onPointerMove, { passive: false });
    document.addEventListener("pointerup", this.onPointerUp, { passive: true });
    document.addEventListener("pointercancel", this.onPointerUp, { passive: true });
    document.addEventListener("click", this.onDocumentClick, true); // capture per intercettare prima se serve
  }

  ngOnDestroy() {
    this.badgeSubscription?.unsubscribe();
    document.removeEventListener("pointermove", this.onPointerMove as any);
    document.removeEventListener("pointerup", this.onPointerUp as any);
    document.removeEventListener("pointercancel", this.onPointerUp as any);
    document.removeEventListener("click", this.onDocumentClick, true);
  }

  onPointerDown = (ev: PointerEvent) => {
    const target = ev.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.dragOffset.x = ev.clientX - rect.left;
    this.dragOffset.y = ev.clientY - rect.top;
    this.startPoint = { x: ev.clientX, y: ev.clientY };
    this.moved = false;
    this.isDragging = true;
    target.setPointerCapture?.(ev.pointerId);
  };

  onPointerMove = (ev: PointerEvent) => {
    if (!this.isDragging) return;
    ev.preventDefault();
    const nextX = ev.clientX - this.dragOffset.x;
    const nextY = ev.clientY - this.dragOffset.y;

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
    // Non chiamare onClick qui: lascia che il (click) nativo scatti da solo
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

  onClick(ev?: MouseEvent) {
    // evita che il click arrivi al document handler
    ev?.stopPropagation();
    this.isPopoverVisible = !this.isPopoverVisible;
    if (this.isPopoverVisible) this.calculatePopoverPosition();
  }

  calculatePopoverPosition() {
    const badgeSize = 60;
    const popoverWidth = 230;
    const popoverHeight = 150;
    const margin = 12;

    let x = this.position.x + badgeSize + margin;
    let y = this.position.y + (badgeSize / 2) - (popoverHeight / 2);

    if (x + popoverWidth > window.innerWidth) {
      x = this.position.x - popoverWidth - margin;
    }
    if (y < 0) y = 0;
    else if (y + popoverHeight > window.innerHeight) {
      y = window.innerHeight - popoverHeight;
    }
    this.popoverPosition = { x, y };
  }

  onDocumentClick = (event: MouseEvent) => {
    if (!this.isPopoverVisible) return;

    const badgeEl = this.badgeRef?.nativeElement;
    const popoverEl = this.popoverRef?.nativeElement;
    const target = event.target as Node;

    const clickInsideBadge = badgeEl?.contains(target);
    const clickInsidePopover = popoverEl?.contains(target);

    if (!clickInsideBadge && !clickInsidePopover) {
      this.isPopoverVisible = false;
    }
  };

  goToRealTime() { 
    this.router.navigate(['event/real-time-stats-notify']);
    this.isPopoverVisible = false; 
  }
  goToChat()  { 
    this.router.navigate(['event/event-chat']);
    this.isPopoverVisible = false;
   }
  onReportIssue()   { console.log('Report issue clicked');   this.isPopoverVisible = false; }
}
