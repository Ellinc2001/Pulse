import { Component, Input } from "@angular/core"

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.html",
  styleUrls: ["./spinner.scss"]
})
export class SpinnerComponent {
  @Input() size: "small" | "medium" | "large" = "medium"
  @Input() message?: string
  @Input() variant: "primary" | "secondary" | "minimal" = "primary"

  get sizeClass(): string {
    return `spinner-${this.size}`
  }

  get variantClass(): string {
    return `spinner-${this.variant}`
  }
}
