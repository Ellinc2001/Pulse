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
  @Input() title = ""
  @Input() icon = ""
  @Input() options: EnumOption[] = []
  @Input() selectedValue = ""
  @Input() allowDeselect = false

  @Output() selectionChange = new EventEmitter<string>()

  onOptionSelect(option: EnumOption) {
    if (this.selectedValue === option.value && this.allowDeselect) {
      this.selectedValue = ""
      this.selectionChange.emit("")
    } else {
      this.selectedValue = option.value
      this.selectionChange.emit(option.value)
    }
  }

  isSelected(option: EnumOption): boolean {
    return this.selectedValue === option.value
  }
}
