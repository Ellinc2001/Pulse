import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "app-toggle-switch",
  templateUrl: "./toggle-switch.html",
  styleUrls: ["./toggle-switch.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ToggleSwitchComponent {
  @Input() label = ""
  @Input() toggleLabel = ""
  @Input() checked = false
  @Input() eventId: string = '';
  @Input() statId: string = '';


  @Output() checkedChange = new EventEmitter<boolean>()

  onToggle() {
    this.checkedChange.emit(!this.checked)
  }
}
