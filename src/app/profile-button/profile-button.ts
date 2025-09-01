import { Component, Output, EventEmitter, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "profile-button",
  standalone: false,
  templateUrl: "./profile-button.html",
  styleUrls: ["./profile-button.scss"],
})
export class ProfileButtonComponent {
  @Input() isActive = false
  @Input() size: "small" | "medium" | "large" = "medium"

  @Output() profileClick = new EventEmitter<void>()

  isClicked = false

  onClick() {
    // Trigger click animation
    this.isClicked = true

    // Reset animation after it completes
    setTimeout(() => {
      this.isClicked = false
    }, 300)

    this.profileClick.emit()
  }

  getSizeClass(): string {
    return `profile-${this.size}`
  }
}
