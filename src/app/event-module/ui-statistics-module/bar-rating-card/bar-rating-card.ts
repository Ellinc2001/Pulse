import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"

@Component({
  selector: "app-bar-rating-card",
  standalone: false,
  templateUrl: "./bar-rating-card.html",
  styleUrls: ["./bar-rating-card.scss"],
})
export class BarRatingCardComponent {
  @Input() title: string | null | undefined = ""
  @Input() icon: string | null | undefined = ""     // 👈 accetta anche null/undefined
  @Input() value: number | null | undefined = 0      // 👈 accetta null/undefined
  @Input() maxValue = 5
  @Input() showFraction = true

  /** Identificatore evento (verrà usato dal data-layer/WebSocket) */
  @Input() eventId!: string

  /** Identificatore statistica (es. 'capacity_utilization', 'avg_basket_value', …) */
  @Input() statId!: string

  get bars(): boolean[] {
    const val = this.value ?? 0      // 👈 fallback sicuro
    const max = this.maxValue ?? 5
    const bars: boolean[] = []

    for (let i = 0; i < max; i++) {
      bars.push(i < val)
    }

    return bars
  }
}
