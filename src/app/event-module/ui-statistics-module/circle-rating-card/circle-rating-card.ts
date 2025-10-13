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
  @Input() value = 0 // Percentage value (0-100)
  @Input() label = "" // Label shown below the percentage
  @Input() size: "small" | "medium" | "large" = "medium"

  get percentage(): number {
    return Math.min(100, Math.max(0, this.value))
  }

  get sizeClass(): string {
    return `gauge-${this.size}`
  }
}
