import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"

export interface HistogramDataPoint {
  label: string
  value: number
  isHighlighted?: boolean
}

@Component({
  selector: "app-discrete-histogram-card",
  standalone: false,
  templateUrl: "./discrete-histogram-card.html",
  styleUrls: ["./discrete-histogram-card.scss"],
})
export class DiscreteHistogramCardComponent {
  @Input() title = ""
  @Input() data: HistogramDataPoint[] = []
  @Input() showMenu = true
  @Input() maxHeight = 120 // Maximum height for bars in pixels

  get normalizedData() {
    if (!this.data.length) return []

    const maxValue = Math.max(...this.data.map((d) => d.value))
    const minBarHeight = 32 // Minimum bar height in pixels

    return this.data.map((point) => ({
      ...point,
      height: Math.max(minBarHeight, (point.value / maxValue) * this.maxHeight),
      percentage: (point.value / maxValue) * 100,
    }))
  }

  onBarHover(event: Event, show: boolean) {
    const target = event.currentTarget as HTMLElement
    const valueLabel = target.querySelector(".value-label") as HTMLElement
    if (valueLabel) {
      valueLabel.style.opacity = show ? "1" : "0"
    }
  }
}
