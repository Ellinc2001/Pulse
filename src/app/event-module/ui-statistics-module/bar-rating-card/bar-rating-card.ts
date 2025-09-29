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
  @Input() title = ""
  @Input() icon = ""
  @Input() value = 0
  @Input() maxValue = 5
  @Input() showFraction = true

  get bars(): boolean[] {
    const bars = []
    for (let i = 0; i < this.maxValue; i++) {
      bars.push(i < this.value)
    }
    return bars
  }
}
