import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"

export interface TimelinePoint {
  label: string
  position: number // percentage 0-100
  color: "green" | "amber" | "primary" | "muted"
}

export interface TimelineData {
  points: TimelinePoint[]
  currentTimePercent: number
  currentTimeLabel: string
}

@Component({
  selector: "app-minimal-timeline-card",
  standalone: false,
  templateUrl: "./minimal-timeline-card.html",
  styleUrls: ["./minimal-timeline-card.scss"],
})
export class MinimalTimelineCardComponent {
  @Input() data: TimelineData = {
    points: [
      { label: "Creazione", position: 10, color: "green" },
      { label: "Check-in", position: 35, color: "amber" },
      { label: "Inizio", position: 60, color: "primary" },
      { label: "Fine", position: 85, color: "muted" },
    ],
    currentTimePercent: 50,
    currentTimeLabel: "Ora",
  }

  getPointColorClass(color: string): string {
    return `point-${color}`
  }
}
