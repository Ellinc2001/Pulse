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
  @Input() title = "Ranking"
  @Input() items: RankingItem[] = []
  @Input() showMenuIcon = true

  getProgressPercentage(item: RankingItem): number {
    if (item.maxValue) {
      return (item.value / item.maxValue) * 100
    }

    // If no maxValue provided, use the highest value in the list as max
    const maxValue = Math.max(...this.items.map((i) => i.value))
    return maxValue > 0 ? (item.value / maxValue) * 100 : 0
  }

  getProgressWidth(item: RankingItem): string {
    return `${this.getProgressPercentage(item)}%`
  }
}
