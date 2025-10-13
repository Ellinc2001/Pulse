import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"

export interface RankingItem {
  name: string
  value: number
  maxValue?: number
}

@Component({
  selector: "app-ranking-list-card",
  standalone: false,
  templateUrl: "./ranking-list-card.html",
  styleUrls: ["./ranking-list-card.scss"],
})
export class RankingListCardComponent {
  @Input() title: string | null | undefined = "Ranking"
  @Input() items: RankingItem[] | null | undefined = []
  @Input() showMenuIcon = true

  /** Identificatore evento (verrà usato dal data-layer/WebSocket) */
  @Input() eventId!: string

  /** Identificatore statistica (es. 'capacity_utilization', 'avg_basket_value', …) */
  @Input() statId!: string

  getProgressPercentage(item: RankingItem): number {
    const list = this.items ?? [] // 👈 fallback sicuro

    if (item.maxValue) {
      return (item.value / item.maxValue) * 100
    }

    const values = list.map((i) => i.value)
    const maxValue = values.length ? Math.max(...values) : 0
    return maxValue > 0 ? (item.value / maxValue) * 100 : 0
  }

  getProgressWidth(item: RankingItem): string {
    return `${this.getProgressPercentage(item)}%`
  }
}
