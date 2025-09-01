import { Component, Output, EventEmitter, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "compass-search-button",
  standalone: false,
  templateUrl: "./compass-search-button.html",
  styleUrls: ["./compass-search-button.scss"],
})
export class CompassSearchButtonComponent {
  @Input() isActive = false
  @Input() size: "small" | "medium" | "large" = "medium"

  @Output() searchClick = new EventEmitter<void>()

  isClicked = false

  onClick() {
    // Trigger click animation
    this.isClicked = true

    // Reset animation after it completes
    setTimeout(() => {
      this.isClicked = false
    }, 400)

    this.searchClick.emit()
  }

  getSizeClass(): string {
    return `compass-${this.size}`
  }
}
