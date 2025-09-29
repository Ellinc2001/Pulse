import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"

@Component({
  selector: "app-progress-metric-card",
  standalone: false,
  templateUrl: "./progress-metric-card.html",
  styleUrls: ["./progress-metric-card.scss"],
})
export class ProgressMetricCardComponent {
  @Input() title = ""
  @Input() icon = ""
  @Input() value = 0
  @Input() unit = "%"
  @Input() maxValue = 100
  @Input() showGradient = true

  get progressPercentage(): number {
    return Math.min((this.value / this.maxValue) * 100, 100)
  }
}
