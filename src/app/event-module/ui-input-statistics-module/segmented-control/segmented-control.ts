import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core"

export interface SegmentOption {
  value: string
  label: string
}

@Component({
  selector: "app-segmented-control",
  templateUrl: "./segmented-control.html",
  styleUrls: ["./segmented-control.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SegmentedControlComponent {
  @Input() options: SegmentOption[] = []
  @Input() value = ""
  @Input() label = ""
  @Input() eventId: string = '';
  @Input() statId: string = '';


  @Output() valueChange = new EventEmitter<string>()

  onSegmentClick(value: string) {
    this.valueChange.emit(value)
  }
}
