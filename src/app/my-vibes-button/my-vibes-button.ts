import { Component, Output, EventEmitter, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "my-vibes-button",
  standalone: false,
  templateUrl: "./my-vibes-button.html",
  styleUrls: ["./my-vibes-button.scss"],
})
export class MyVibesButtonComponent {
  @Input() isActive = false
  @Input() size: "small" | "medium" | "large" = "large"

  @Output() vibesClick = new EventEmitter<void>()

  isClicked = false

  onClick() {
    // Trigger click animation
    this.isClicked = true

    // Reset animation after it completes
    setTimeout(() => {
      this.isClicked = false
    }, 600)

    this.vibesClick.emit()
  }

  getSizeClass(): string {
    return `vibes-${this.size}`
  }
}
