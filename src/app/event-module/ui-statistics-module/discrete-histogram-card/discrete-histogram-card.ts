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
  @Input() title: string | null | undefined = ""
  @Input() data: HistogramDataPoint[] | null | undefined = []  // 👈 ora può essere undefined/null
  @Input() showMenu = true
  @Input() maxHeight = 120 // Maximum height for bars in pixels

  /** Identificatore evento (verrà usato dal data-layer/WebSocket) */
  @Input() eventId!: string

  /** Identificatore statistica (es. 'capacity_utilization', 'avg_basket_value', …) */
  @Input() statId!: string

  get normalizedData() {
    const dataset = this.data ?? [] // 👈 fallback sicuro
    if (!dataset.length) return []

    const maxValue = Math.max(...dataset.map((d) => d.value))
    const minBarHeight = 32 // Minimum bar height in pixels

    return dataset.map((point) => ({
      ...point,
      height: Math.max(minBarHeight, (point.value / maxValue) * this.maxHeight),
      percentage: (point.value / maxValue) * 100,
    }))
  }

  onBarHover(event: Event, show: boolean) {
    const target = event.currentTarget as HTMLElement | null
    if (!target) return

    const valueLabel = target.querySelector(".value-label") as HTMLElement | null
    if (valueLabel) {
      valueLabel.style.opacity = show ? "1" : "0"
    }
  }
}
