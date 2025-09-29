import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"

export interface ProgressSegment {
  label: string
  value: number
  color: string
  glowColor?: string
}

@Component({
  selector: "app-stacked-progress-card",
  standalone: false,
  templateUrl: "./stacked-progress-card.html",
  styleUrls: ["./stacked-progress-card.scss"],
})
export class StackedProgressCardComponent {
  @Input() title = ""
  @Input() segments: ProgressSegment[] = []
  @Input() showMenu = true
  @Input() unit = "%"

  get totalValue(): number {
    return this.segments.reduce((sum, segment) => sum + segment.value, 0)
  }

  getSegmentWidth(segment: ProgressSegment): number {
    return this.totalValue > 0 ? (segment.value / this.totalValue) * 100 : 0
  }

  getSegmentStyle(segment: ProgressSegment): any {
    const width = this.getSegmentWidth(segment)
    const glowColor = segment.glowColor || segment.color

    return {
      width: `${width}%`,
      "background-color": segment.color,
      "box-shadow": `0 0 5px ${glowColor}`,
    }
  }

  getLegendDotStyle(segment: ProgressSegment): any {
    return {
      "background-color": segment.color,
    }
  }
}
