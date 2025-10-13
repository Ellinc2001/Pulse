import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"

export interface EnumOption {
  value: string
  label: string
  icon?: string
}

@Component({
  selector: "app-enum-pill-card",
  standalone: false,
  templateUrl: "./enum-pill-card.html",
  styleUrls: ["./enum-pill-card.scss"],
})
export class EnumPillCardComponent {
  @Input() title: string | null | undefined = ""
  @Input() icon: string | null | undefined = ""
  @Input() options: EnumOption[] | null | undefined = []
  @Input() selectedValue: string | null | undefined = ""
  @Input() allowDeselect = false

  @Output() selectionChange = new EventEmitter<string>()

  /** Identificatore evento (verrà usato dal data-layer/WebSocket) */
  @Input() eventId!: string

  /** Identificatore statistica (es. 'capacity_utilization', 'avg_basket_value', …) */
  @Input() statId!: string

  onOptionSelect(option: EnumOption) {
    if (!option) return

    const current = this.selectedValue ?? ""
    const nextValue =
      current === option.value && this.allowDeselect ? "" : option.value

    this.selectedValue = nextValue
    this.selectionChange.emit(nextValue)
  }

  isSelected(option: EnumOption): boolean {
    if (!option || !this.selectedValue) return false
    return this.selectedValue === option.value
  }
}
