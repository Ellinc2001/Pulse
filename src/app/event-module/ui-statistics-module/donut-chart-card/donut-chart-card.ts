import { Component, Input, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"

export interface DonutSegment {
  label: string
  value: number
  color: string
  description?: string
}

@Component({
  selector: "app-donut-chart-card",
  templateUrl: "./donut-chart-card.html",
  styleUrls: ["./donut-chart-card.scss"],
  standalone: false,
})
export class DonutChartCardComponent implements OnInit {
  @Input() title = "Donut Chart"
  @Input() segments: DonutSegment[] = []
  @Input() centerText = "100%"
  @Input() centerSubtext = "Total"
  @Input() showMenu = true

    /** Identificatore evento (verrà usato dal data-layer/WebSocket) */
  @Input() eventId!: string;

  /** Identificatore statistica (es. 'capacity_utilization', 'avg_basket_value', …) */
  @Input() statId!: string;

  conicGradient = ""
  totalValue = 0

  ngOnInit() {
    this.calculateGradient()
  }

  private calculateGradient() {
    this.totalValue = this.segments.reduce((sum, segment) => sum + segment.value, 0)

    let currentPercentage = 0
    const gradientStops: string[] = []

    this.segments.forEach((segment, index) => {
      const segmentPercentage = (segment.value / this.totalValue) * 100

      if (index === 0) {
        gradientStops.push(`${segment.color} 0 ${segmentPercentage}%`)
      } else {
        gradientStops.push(`${segment.color} ${currentPercentage}% ${currentPercentage + segmentPercentage}%`)
      }

      currentPercentage += segmentPercentage
    })

    this.conicGradient = `conic-gradient(from 0deg, ${gradientStops.join(", ")})`
  }

  getPercentage(value: number): number {
    return Math.round((value / this.totalValue) * 100)
  }
}
