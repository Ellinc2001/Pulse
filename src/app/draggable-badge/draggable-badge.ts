import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  NgZone,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { BadgeService, BadgeData } from "src/app/services/badge-service";
import type { EventData } from "../event-module/event-card/event-card";
import type { Subscription } from "rxjs";

@Component({
  selector: "app-draggable-badge",
  templateUrl: "./draggable-badge.html",
  styleUrls: ["./draggable-badge.scss"],
  standalone: false,
})
export class DraggableBadgeComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() eventData: EventData | null = null;
  @Input() initialPosition: { x: number; y: number } = { x: 20, y: 100 };
  @Output() positionChange = new EventEmitter<{ x: number; y: number }>();

  @ViewChild("badgeRef", { static: false }) badgeRef?: ElementRef<HTMLElement>;
  @ViewChild("popoverRef", { static: false }) popoverRef?: ElementRef<HTMLElement>;

  // UI state
  isVisible = false;
  isPopoverVisible = false;
  popoverPosition = { x: 0, y: 0 };

  private suppressNextClick = false;
  private downPointerId: number | null = null;

  private popoverAppendedToBody = false;
  private originalPopoverParent: Node | null = null;



  // state (non usato nel template per il badge, quindi non ritrigghera render continuo)
  position = { x: 20, y: 100 };

  // drag
  isDragging = false;
  private moved = false;
  private startPoint: { x: number; y: number } | null = null;
  private dragOffset = { x: 0, y: 0 };

  // performance
  private rafId: number | null = null;
  private pending: { x: number; y: number } | null = null;

  // bounds
  private readonly badgeSize = 60;
  private maxX = 0;
  private maxY = 0;

  private badgeSubscription?: Subscription;

  constructor(
    private router: Router,
    private badgeService: BadgeService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.recomputeBounds();

    this.badgeSubscription = this.badgeService.badge$.subscribe((badgeData: BadgeData) => {
      this.isVisible = badgeData.isVisible;
      this.eventData = badgeData.eventData;

      const pos = badgeData.position ?? this.initialPosition;
      this.position = { ...pos };
      // applica subito transform (badge non usa binding left/top)
      this.applyTransform(this.position.x, this.position.y);
    });

    // In caso badgeService non emetta subito:
    this.position = { ...this.initialPosition };
    this.applyTransform(this.position.x, this.position.y);

    // listeners fuori Angular = niente scatti
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener("pointermove", this.onPointerMove, { passive: false });
      // document.addEventListener("pointerup", this.onPointerUp, { passive: true });
      // document.addEventListener("pointercancel", this.onPointerUp, { passive: true });
      document.addEventListener("pointerdown", this.onDocumentPointerDown, { capture: true, passive: true } as any);
      window.addEventListener("resize", this.onResize, { passive: true });
      window.addEventListener("orientationchange", this.onResize, { passive: true });
    });
  }

  ngAfterViewInit() {
    this.applyTransformSafe(this.position.x, this.position.y);

    const popoverEl = this.popoverRef?.nativeElement;
    if (popoverEl && !this.popoverAppendedToBody) {
      this.originalPopoverParent = popoverEl.parentNode;
      document.body.appendChild(popoverEl);
      this.popoverAppendedToBody = true;
    }
  }


ngOnDestroy() {
  this.badgeSubscription?.unsubscribe();

  document.removeEventListener("pointermove", this.onPointerMove as any);
  document.removeEventListener("pointerdown", this.onDocumentPointerDown as any, true);
  window.removeEventListener("resize", this.onResize as any);
  window.removeEventListener("orientationchange", this.onResize as any);

  if (this.rafId) cancelAnimationFrame(this.rafId);

  // ripristino popover nel parent originale (opzionale)
  const popoverEl = this.popoverRef?.nativeElement;
  if (popoverEl && this.popoverAppendedToBody) {
    if (this.originalPopoverParent) this.originalPopoverParent.appendChild(popoverEl);
    else popoverEl.remove();
  }
}


  // ---------- pointer handlers ----------

  onPointerDown = (ev: PointerEvent) => {
    const el = this.badgeRef?.nativeElement ?? (ev.currentTarget as HTMLElement | null);
    if (!el) return;
    ev.preventDefault(); // <--- aggiungi questo

    const rect = el.getBoundingClientRect();
    this.dragOffset.x = ev.clientX - rect.left;
    this.dragOffset.y = ev.clientY - rect.top;

    this.startPoint = { x: ev.clientX, y: ev.clientY };
    this.moved = false;
    this.isDragging = true;
    this.suppressNextClick = false;
    this.downPointerId = ev.pointerId;

    el.setPointerCapture?.(ev.pointerId);
  };

  onPointerMove = (ev: PointerEvent) => {
    if (!this.isDragging) return;

    ev.preventDefault(); // blocca scroll/gestures mentre trascini

    const nextX = ev.clientX - this.dragOffset.x;
    const nextY = ev.clientY - this.dragOffset.y;

    if (!this.moved && this.startPoint) {
      const dx = Math.abs(ev.clientX - this.startPoint.x);
      const dy = Math.abs(ev.clientY - this.startPoint.y);
      this.moved = Math.hypot(dx, dy) > 6;

      if (this.moved) this.suppressNextClick = true; // “se ho trascinato, ignora click”
    }

    this.pending = { x: nextX, y: nextY };
    if (!this.rafId) this.rafId = requestAnimationFrame(this.flushPending);
  };


  onPointerUp = (ev: PointerEvent) => {
    console.log("pointerup", "moved:", this.moved);

    if (!this.isDragging) return;

    this.isDragging = false;

    // flush ultimo frame drag
    if (this.pending) this.flushPending();

    const el = this.badgeRef?.nativeElement;
    el?.releasePointerCapture?.(ev.pointerId);

    const wasTap = !this.moved;

    this.startPoint = null;

    if (wasTap) {
      this.suppressNextClick = true;

      this.ngZone.run(() => {
        this.togglePopover();
      });

      setTimeout(() => (this.suppressNextClick = false), 0);
      return;
    }


    // DRAG: emetti posizione a fine drag
    this.ngZone.run(() => {
      this.positionChange.emit({ ...this.position });
    });

    setTimeout(() => {
      this.moved = false;
      this.suppressNextClick = false;
    }, 0);
  };

  // ---------- RAF + transform ----------

  private flushPending = () => {
    if (!this.pending) {
      this.rafId = null;
      return;
    }

    let x = this.pending.x;
    let y = this.pending.y;

    // constrain
    x = Math.max(0, Math.min(x, this.maxX));
    y = Math.max(0, Math.min(y, this.maxY));

    this.position.x = x;
    this.position.y = y;

    this.applyTransform(x, y);

    this.pending = null;
    this.rafId = null;
  };

  // ---------- click / popover ----------

  onClick(ev?: MouseEvent) {
    ev?.stopPropagation();

    if (this.suppressNextClick) return;

    // rientra in Angular e forza repaint
    this.ngZone.run(() => {
      this.togglePopover();
    });
  }


private calculatePopoverPosition() {
  const badgeEl = this.badgeRef?.nativeElement;
  if (!badgeEl) return;

  const rect = badgeEl.getBoundingClientRect();

  const popoverWidth = 240;   // uguale al CSS .popover-menu width
  const popoverHeight = 150;
  const margin = 12;

  // Prova a destra del badge
  let x = rect.right + margin;
  let y = rect.top + rect.height / 2 - popoverHeight / 2;

  // Se esce a destra, mettilo a sinistra
  if (x + popoverWidth > window.innerWidth) {
    x = rect.left - popoverWidth - margin;
  }

  // Clamp dentro viewport
  x = Math.max(margin, Math.min(x, window.innerWidth - popoverWidth - margin));
  y = Math.max(margin, Math.min(y, window.innerHeight - popoverHeight - margin));

  this.popoverPosition = { x, y };
}



  // ---------- navigation ----------

  goToRealTime() {
    this.router.navigate(["event/real-time-stats-notify"]);
    this.isPopoverVisible = false;
  }

  goToChat() {
    this.router.navigate(["event/event-chat"]);
    this.isPopoverVisible = false;
  }

  onReportIssue() {
    console.log("Report issue clicked");
    this.isPopoverVisible = false;
  }

  // ---------- bounds ----------

  private onResize = () => {
    this.recomputeBounds();

    // se fuori bounds dopo resize, rientra
    const x = Math.max(0, Math.min(this.position.x, this.maxX));
    const y = Math.max(0, Math.min(this.position.y, this.maxY));

    if (x !== this.position.x || y !== this.position.y) {
      this.position.x = x;
      this.position.y = y;
      this.applyTransform(x, y);

      // opzionale: notifica anche il parent
      this.ngZone.run(() => this.positionChange.emit({ ...this.position }));
    }

    // se popover aperto, ricalcola
    if (this.isPopoverVisible) {
      this.ngZone.run(() => this.calculatePopoverPosition());
    }
  };

  private recomputeBounds() {
    this.maxX = window.innerWidth - this.badgeSize;
    this.maxY = window.innerHeight - this.badgeSize;
  }

  private getBadgeElFromEvent(ev: PointerEvent): HTMLElement | null {
    // preferisci ViewChild se c’è, altrimenti fallback sul target del listener
    return this.badgeRef?.nativeElement ?? (ev.currentTarget as HTMLElement | null);
  }
  
  private applyTransformSafe(x: number, y: number) {
    const el = this.badgeRef?.nativeElement;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  private applyTransform(x: number, y: number) {
    // usa safe per non esplodere se *ngIf l’ha tolto
    this.applyTransformSafe(x, y);
  }
private togglePopover() {
  this.isPopoverVisible = !this.isPopoverVisible;
  if (this.isPopoverVisible) this.calculatePopoverPosition();
  console.log("TOGGLE ->", this.isPopoverVisible, this.popoverPosition);
  this.cdr.detectChanges();
}


  private onDocumentPointerDown = (event: PointerEvent) => {
  if (!this.isPopoverVisible) return;

  const badgeEl = this.badgeRef?.nativeElement;
  const popoverEl = this.popoverRef?.nativeElement;

  const path = (event.composedPath?.() ?? []) as EventTarget[];

  const insideBadge = !!badgeEl && path.includes(badgeEl);
  const insidePopover = !!popoverEl && path.includes(popoverEl);

  if (!insideBadge && !insidePopover) {
    this.ngZone.run(() => {
      this.isPopoverVisible = false;
      this.cdr.detectChanges();
    });
  }
};


}
