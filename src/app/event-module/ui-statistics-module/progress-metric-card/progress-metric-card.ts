import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-progress-metric-card",
  templateUrl: "./progress-metric-card.html",
  styleUrls: ["./progress-metric-card.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ProgressMetricCardComponent implements OnChanges {
  /** Identificatori (per data-layer/WebSocket) */
  @Input() eventId!: string;
  @Input() statId!: string;

  /** API di presentazione — ORA bindabili dal parent */
  @Input() title?: string;
  @Input() icon?: string;
  @Input() value?: number;
  @Input() unit?: string;
  @Input() maxValue?: number;
  @Input() showGradient?: boolean;

  /** Fallback locali */
  private readonly defaults = {
    title: "Metrica",
    icon: "speedometer-outline",
    value: 0,
    unit: "",
    maxValue: 100,
    showGradient: true,
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['statId'] || changes['value'] || changes['title']) {
      console.log('[ProgressMetricCard] inputs', {
        eventId: this.eventId, statId: this.statId,
        title: this.title, value: this.value, unit: this.unit
      });
    }
  }

  get effectiveTitle()       { return this.title ?? this.defaults.title; }
  get effectiveIcon()        { return this.icon ?? this.defaults.icon; }
  get effectiveValue()       { return this.value ?? this.defaults.value; }
  get effectiveUnit()        { return this.unit ?? this.defaults.unit; }
  get effectiveMaxValue()    { return this.maxValue ?? this.defaults.maxValue; }
  get effectiveShowGradient(){ return this.showGradient ?? this.defaults.showGradient; }

  get progressPercentage(): number {
    const max = this.effectiveMaxValue || 100;
    const v   = this.effectiveValue || 0;
    const pct = (v / max) * 100;
    return Math.max(0, Math.min(pct, 100));
  }
}
