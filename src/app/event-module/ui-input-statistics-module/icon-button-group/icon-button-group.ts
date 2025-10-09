import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core"

export interface IconButtonOption {
  value: string
  icon: string
  label?: string
}

@Component({
  selector: "app-icon-button-group",
  templateUrl: "./icon-button-group.html",
  styleUrls: ["./icon-button-group.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class IconButtonGroupComponent {
  @Input() options: IconButtonOption[] = []
  @Input() value = ""
  @Input() label = ""
  @Input() eventId: string = '';
  @Input() statId: string = '';

  @Output() valueChange = new EventEmitter<string>()

  onButtonClick(value: string) {
    this.valueChange.emit(value)
  }
}
