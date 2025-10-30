import { Component, Input } from "@angular/core"

export interface FoodCardData {
  tags: string[]
  description: string
  menuCategories: string[]
  menuDetails?: { name: string; description: string }[]
}

@Component({
  selector: "app-food-card",
  standalone: false,
  templateUrl: "./food-card.html",
  styleUrls: ["./food-card.scss"],
})
export class FoodCardComponent {
  @Input() data: FoodCardData = {
    tags: ["Cocktail", "GF", "Vegan"],
    description:
      'Signature cocktail "The Indie Spark" available. A selection of craft beers and gourmet street food with gluten-free and vegan options.',
    menuCategories: ["Cocktails", "Craft Beer", "Street Food", "Soft Drinks"],
    menuDetails: [
      { name: "Indie Spark", description: "Gin, Elderflower, Lime" },
      { name: "Rock Burger", description: "Beyond Meat patty option available" },
    ],
  }

  @Input() isHighlighted = false
  isExpanded = false

  toggleExpand() {
    this.isExpanded = !this.isExpanded
  }
}
