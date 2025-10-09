import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core"

export interface ChipOption {
  value: string
  label: string
}

@Component({
  selector: "app-chip-selector",
  templateUrl: "./chip-selector.html",
  styleUrls: ["./chip-selector.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ChipSelectorComponent {
  @Input() options: ChipOption[] = []
  @Input() selectedValue: string | null = null
  @Input() selectedValues: string[] = []
  @Input() multiSelect = false
  @Input() title = ""
  @Input() subtitle = ""
  @Input() eventId: string = '';
  @Input() statId: string = '';

  @Output() valueChange = new EventEmitter<string>()
  @Output() valuesChange = new EventEmitter<string[]>()

  onChipClick(value: string) {
    if (this.multiSelect) {
      const newValues = this.selectedValues.includes(value)
        ? this.selectedValues.filter((v) => v !== value)
        : [...this.selectedValues, value]
      this.valuesChange.emit(newValues)
    } else {
      this.valueChange.emit(value)
    }
  }

  isSelected(value: string): boolean {
    return this.multiSelect ? this.selectedValues.includes(value) : this.selectedValue === value
  }
}
