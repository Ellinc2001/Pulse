import { Component, Input, type OnInit } from "@angular/core"

export interface GaugeData {
  title: string
  icon: string
  value: number
  unit: string
  maxValue: number
  minValue?: number
  p50?: number
  p95?: number
  p50Unit?: string
  p95Unit?: string
}

@Component({
  selector: "app-gauge-metric-card",
  templateUrl: "./gauge-metric-card.html",
  styleUrls: ["./gauge-metric-card.scss"],
  standalone: false
})
export class GaugeMetricCardComponent implements OnInit {
  @Input() data: GaugeData = {
    title: "Wait Time",
    icon: "hourglass_empty",
    value: 42,
    unit: "min",
    maxValue: 90,
    minValue: 0,
    p50: 35,
    p95: 68,
    p50Unit: "min",
    p95Unit: "min",
  }

  gaugePercentage = 0
  needleRotation = 0
  ticks: number[] = []

  ngOnInit() {
    this.calculateGaugeValues()
    this.generateTicks()
  }

  private calculateGaugeValues() {
    const range = this.data.maxValue - (this.data.minValue || 0)
    const adjustedValue = this.data.value - (this.data.minValue || 0)
    this.gaugePercentage = Math.min(Math.max((adjustedValue / range) * 100, 0), 100)

    // Needle rotation: -90deg to +90deg (180deg total)
    this.needleRotation = (this.gaugePercentage / 100) * 180 - 90
  }

  private generateTicks() {
    // Generate 11 ticks from -90deg to +90deg
    this.ticks = Array.from({ length: 11 }, (_, i) => -90 + i * 18)
  }

  getGaugeColor(): string {
    if (this.gaugePercentage <= 33) return "var(--gauge-green)"
    if (this.gaugePercentage <= 66) return "var(--gauge-yellow)"
    return "var(--gauge-red)"
  }

  getGaugeGradient(): string {
    return `conic-gradient(
      from -90deg at 50% 100%,
      var(--gauge-green) 0%,
      var(--gauge-green) 33.33%,
      var(--gauge-yellow) 33.33%,
      var(--gauge-yellow) 66.66%,
      var(--gauge-red) 66.66%,
      var(--gauge-red) 100%
    )`
  }
}
