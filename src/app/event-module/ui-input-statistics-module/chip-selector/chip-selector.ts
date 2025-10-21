import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnChanges, SimpleChanges } from "@angular/core";

export interface ChipOption {
  value: string; // manteniamo string per compatibilità con il parent
  label: string;
}

@Component({
  selector: "app-chip-selector",
  templateUrl: "./chip-selector.html",
  styleUrls: ["./chip-selector.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ChipSelectorComponent implements OnInit, OnChanges {

  // preset default (minuti) → verranno trasformati in {value,label}
  private static readonly DEFAULT_MINUTES = [2, 5, 8, 12, 15];

  /** Suffix per l’etichetta automatica */
  @Input() minuteSuffix: string = ' min';

  /** Se true, genera label auto quando mancano */
  @Input() autoLabel: boolean = true;

  /** Opzioni: se non passate, si usano i preset minuti */
  @Input() options: ChipOption[] = [];

  @Input() selectedValue: string | null = null;
  @Input() selectedValues: string[] = [];
  @Input() multiSelect = false;

  @Input() title = "";
  @Input() subtitle = "";
  @Input() eventId: string = '';
  @Input() statId: string = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() valuesChange = new EventEmitter<string[]>();

  ngOnInit(): void {
    this.ensureMinuteOptions();
    this.ensureSelection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.ensureMinuteOptions();
      this.ensureSelection();
    }
  }

  // ---------- helpers ----------
  private ensureMinuteOptions() {
    // se non ci sono options, crea pillole di minuti default
    if (!this.options || this.options.length === 0) {
      this.options = ChipSelectorComponent.DEFAULT_MINUTES.map(m => ({
        value: String(m),
        label: `${m}${this.minuteSuffix}`,
      }));
      return;
    }

    // altrimenti normalizza: se manca label, crea “{value} min”
    if (this.autoLabel) {
      this.options = this.options.map(o => ({
        value: o.value,
        label: (o.label && o.label.trim().length > 0) ? o.label : `${o.value}${this.minuteSuffix}`,
      }));
    }
  }

  private ensureSelection() {
    // se nessuna selezione, seleziona la prima opzione (single) o nessuna (multi)
    if (!this.multiSelect) {
      if (!this.selectedValue && this.options.length > 0) {
        this.selectedValue = this.options[0].value;
        this.valueChange.emit(this.selectedValue);
      }
    } else {
      // pulizia valori non presenti
      const allowed = new Set(this.options.map(o => o.value));
      this.selectedValues = (this.selectedValues || []).filter(v => allowed.has(v));
    }
  }

  // ---------- UI ----------
  onChipClick(value: string) {
    if (this.multiSelect) {
      const exists = this.selectedValues.includes(value);
      const next = exists
        ? this.selectedValues.filter(v => v !== value)
        : [...this.selectedValues, value];
      this.selectedValues = next;
      this.valuesChange.emit(next);
    } else {
      this.selectedValue = value;
      this.valueChange.emit(value);
    }
  }

  isSelected(value: string): boolean {
    return this.multiSelect ? this.selectedValues.includes(value) : this.selectedValue === value;
  }
}
