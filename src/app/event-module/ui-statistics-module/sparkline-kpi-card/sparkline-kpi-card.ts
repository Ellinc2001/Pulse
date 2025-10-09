import { Component, Input, type OnInit } from "@angular/core"

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
export class SparklineKpiCardComponent implements OnInit {
  @Input() data!: SparklineKpiData
  @Input() width = 100
  @Input() height = 30

    /** Identificatore evento (verrà usato dal data-layer/WebSocket) */
  @Input() eventId!: string;

  /** Identificatore statistica (es. 'capacity_utilization', 'avg_basket_value', …) */
  @Input() statId!: string;
  
  sparklinePath = ""
  sparklineFillPath = ""

  ngOnInit() {
    this.generateSparklinePaths()
  }

  ngOnChanges() {
    this.generateSparklinePaths()
  }

  private generateSparklinePaths() {
    if (!this.data?.sparklineData || this.data.sparklineData.length === 0) {
      return
    }

    const points = this.data.sparklineData
    const maxValue = Math.max(...points.map((p) => p.value))
    const minValue = Math.min(...points.map((p) => p.value))
    const range = maxValue - minValue || 1

    // Generate path points
    const pathPoints = points.map((point, index) => {
      const x = (index / (points.length - 1)) * this.width
      const y = this.height - ((point.value - minValue) / range) * this.height
      return { x, y }
    })

    // Create line path
    this.sparklinePath = pathPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")

    // Create fill path (area under curve)
    const fillPoints = [...pathPoints, { x: this.width, y: this.height }, { x: 0, y: this.height }]

    this.sparklineFillPath =
      fillPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"
  }

  getTrendIcon(): string {
    if (!this.data.trend) return ""
    return this.data.trend.direction === "up" ? "arrow-up-outline" : "arrow-down-outline"
  }

  getTrendColor(): string {
    if (!this.data.trend) return ""

    if (this.data.trend.color) {
      return this.data.trend.color === "success"
        ? "text-green-400"
        : this.data.trend.color === "danger"
          ? "text-red-400"
          : "text-yellow-400"
    }

    return this.data.trend.direction === "up" ? "text-green-400" : "text-red-400"
  }

  formatTrendValue(): string {
    if (!this.data.trend) return ""
    const sign = this.data.trend.direction === "up" ? "+" : "-"
    return `${sign}${Math.abs(this.data.trend.value)}%`
  }
}
