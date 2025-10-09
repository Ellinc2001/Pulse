import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"

@Component({
  selector: "app-circle-rating-card",
  standalone: false,
  templateUrl: "./circle-rating-card.html",
  styleUrls: ["./circle-rating-card.scss"],
})
export class CircleRatingCardComponent {
  @Input() title = ""
  @Input() icon = ""
  @Input() value = 0
  @Input() maxValue = 5
  @Input() showFraction = true

    /** Identificatore evento (verrà usato dal data-layer/WebSocket) */
  @Input() eventId!: string;

  /** Identificatore statistica (es. 'capacity_utilization', 'avg_basket_value', …) */
  @Input() statId!: string;

  get circles(): boolean[] {
    const circles = []
    for (let i = 0; i < this.maxValue; i++) {
      circles.push(i < this.value)
    }
    return circles
  }

  trackByIndex(index: number): number {
    return index
  }
}
