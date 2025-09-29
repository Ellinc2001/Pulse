import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"

export interface TimelineSlot {
  label: string
  startPercent: number
  widthPercent: number
}

export interface DelayIndicator {
  label: string
  position: number // percentage
  color: "red" | "amber" | "green"
  direction: "up" | "down"
}

export interface TimelineData {
  title: string
  icon: string
  slots: TimelineSlot[]
  currentTimePercent: number
  currentTimeLabel: string
  delayIndicators: DelayIndicator[]
  timeLabels: string[]
}

@Component({
  selector: "app-minimal-timeline-card",
  standalone: false,
  templateUrl: "./minimal-timeline-card.html",
  styleUrls: ["./minimal-timeline-card.scss"],
})
export class MinimalTimelineCardComponent {
  @Input() data: TimelineData = {
    title: "Timeline Minimale",
    icon: "timeline",
    slots: [
      { label: "Warmup Set", startPercent: 0, widthPercent: 25 },
      { label: "Live Performance", startPercent: 25, widthPercent: 45 },
      { label: "Closing Set", startPercent: 70, widthPercent: 30 },
    ],
    currentTimePercent: 60,
    currentTimeLabel: "Ora",
    delayIndicators: [
      { label: "+15m", position: 45, color: "red", direction: "down" },
      { label: "Ritardo", position: 72, color: "amber", direction: "up" },
    ],
    timeLabels: ["22:00", "23:00", "00:00", "01:00"],
  }

  getDelayColorClass(color: "red" | "amber" | "green"): string {
    const colorMap = {
      red: "red-fluo",
      amber: "amber-fluo",
      green: "green-fluo",
    }
    return colorMap[color]
  }

  getDelayGlowClass(color: "red" | "amber" | "green"): string {
    const glowMap = {
      red: "text-shadow-red-glow",
      amber: "text-shadow-amber-glow",
      green: "text-shadow-glow",
    }
    return glowMap[color]
  }

  getDelayShadowClass(color: "red" | "amber" | "green"): string {
    const shadowMap = {
      red: "shadow-[0_0_4px_var(--red-fluo)]",
      amber: "shadow-[0_0_4px_var(--amber-fluo)]",
      green: "shadow-[0_0_4px_var(--green-fluo)]",
    }
    return shadowMap[color]
  }
}
