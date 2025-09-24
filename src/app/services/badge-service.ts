import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import type { EventData } from 'src/app/event-module/event-card/event-card'

export interface BadgeData {
  isVisible: boolean
  eventData: EventData | null
  position?: { x: number; y: number }
}

@Injectable({
  providedIn: "root",
})
export class BadgeService {
  private badgeSubject = new BehaviorSubject<BadgeData>({
    isVisible: false,
    eventData: null,
    position: { x: 20, y: 100 },
  })

  public badge$ = this.badgeSubject.asObservable()

  constructor() {
    // Check localStorage on service initialization
    this.loadBadgeState()
  }

  showBadge(eventData: EventData, position?: { x: number; y: number }) {
    const badgeData: BadgeData = {
      isVisible: true,
      eventData,
      position: position || { x: 20, y: 100 },
    }

    this.badgeSubject.next(badgeData)
    this.saveBadgeState(badgeData)
  }

  hideBadge() {
    const badgeData: BadgeData = {
      isVisible: false,
      eventData: null,
      position: { x: 20, y: 100 },
    }

    this.badgeSubject.next(badgeData)
    this.clearBadgeState()
  }

  updateBadgePosition(position: { x: number; y: number }) {
    const currentBadge = this.badgeSubject.value
    if (currentBadge.isVisible) {
      const updatedBadge = { ...currentBadge, position }
      this.badgeSubject.next(updatedBadge)
      this.saveBadgeState(updatedBadge)
    }
  }

  private saveBadgeState(badgeData: BadgeData) {
    localStorage.setItem("badgeState", JSON.stringify(badgeData))
  }

  private loadBadgeState() {
    const savedState = localStorage.getItem("badgeState")
    if (savedState) {
      try {
        const badgeData: BadgeData = JSON.parse(savedState)
        this.badgeSubject.next(badgeData)
      } catch (error) {
        console.error("[v0] Error loading badge state:", error)
        this.clearBadgeState()
      }
    }
  }

  private clearBadgeState() {
    localStorage.removeItem("badgeState")
  }
}
