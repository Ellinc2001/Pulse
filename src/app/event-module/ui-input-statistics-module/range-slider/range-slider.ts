import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "app-range-slider",
  templateUrl: "./range-slider.html",
  styleUrls: ["./range-slider.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RangeSliderComponent {
  @Input() label = ""
  @Input() min = 1
  @Input() max = 5
  @Input() value = 3
  @Input() showLabels = true
  @Input() leftEmoji = ""
  @Input() rightEmoji = ""
  @Input() centerEmoji = ""
  @Input() leftLabel = ""
  @Input() rightLabel = ""
  @Input() variant: "default" | "volume" | "energy" = "default"
  @Input() eventId: string = '';
  @Input() statId: string = '';


  @Output() valueChange = new EventEmitter<number>()

  get labels(): number[] {
    return Array.from({ length: this.max - this.min + 1 }, (_, i) => this.min + i)
  }

  onValueChange(event: any) {
    this.valueChange.emit(Number(event.target.value))
  }
}
