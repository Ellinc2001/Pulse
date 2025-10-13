import { Component, Input, OnInit, OnChanges, SimpleChanges } from "@angular/core"

export interface SparklineDataPoint {
  value: number
  timestamp?: Date
}

export interface SparklineKpiData {
  title: string
  value: string | number
  unit?: string
  trend?: {
    value: number
    direction: "up" | "down"
    color?: "success" | "danger" | "warning"
  }
  sparklineData: SparklineDataPoint[]
  icon?: string
}

@Component({
  selector: "app-sparkline-kpi-card",
  templateUrl: "./sparkline-kpi-card.html",
  styleUrls: ["./sparkline-kpi-card.scss"],
  standalone: false
})
export class SparklineKpiCardComponent implements OnInit, OnChanges {
  /**
   * Dati del KPI con sparkline.
   * Può essere `undefined` o `null` finché non arriva il payload reale.
   */
  @Input() data?: SparklineKpiData | null

  @Input() width: number | null | undefined = 100
  @Input() height: number | null | undefined = 30

  /** Identificatore evento (verrà usato dal data-layer/WebSocket) */
  @Input() eventId!: string

  /** Identificatore statistica (es. 'capacity_utilization', 'avg_basket_value', …) */
  @Input() statId!: string
  
  sparklinePath = ""
  sparklineFillPath = ""

  ngOnInit() {
    this.generateSparklinePaths()
  }

  ngOnChanges(_: SimpleChanges) {
    this.generateSparklinePaths()
  }

  private resetPaths(): void {
    this.sparklinePath = ""
    this.sparklineFillPath = ""
  }

  private generateSparklinePaths(): void {
    const points = this.data?.sparklineData ?? []
    if (!points.length) {
      this.resetPaths()
      return
    }

    // 👇 fallback numerico sicuro
    const width = this.width ?? 100
    const height = this.height ?? 30

    const maxValue = Math.max(...points.map((p) => p.value))
    const minValue = Math.min(...points.map((p) => p.value))
    const range = maxValue - minValue || 1

    const pathPoints = points.map((point, index) => {
      const x = (index / (points.length - 1)) * width
      const y = height - ((point.value - minValue) / range) * height
      return { x, y }
    })

    this.sparklinePath = pathPoints
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ")

    const fillPoints = [...pathPoints, { x: width, y: height }, { x: 0, y: height }]
    this.sparklineFillPath =
      fillPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"
  }

  getTrendIcon(): string {
    const t = this.data?.trend
    return !t ? "" : t.direction === "up" ? "arrow-up-outline" : "arrow-down-outline"
  }

  getTrendColor(): string {
    const t = this.data?.trend
    if (!t) return ""

    if (t.color) {
      switch (t.color) {
        case "success": return "text-green-400"
        case "danger": return "text-red-400"
        case "warning": return "text-yellow-400"
      }
    }

    return t.direction === "up" ? "text-green-400" : "text-red-400"
  }

  formatTrendValue(): string {
    const t = this.data?.trend
    if (!t) return ""
    const sign = t.direction === "up" ? "+" : "-"
    return `${sign}${Math.abs(t.value)}%`
  }
}
