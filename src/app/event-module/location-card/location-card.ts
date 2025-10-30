import { Component, Input } from "@angular/core"

export interface LocationCardData {
  areas: string[]
  description: string
  crowdLevel: number // 0-100
}

@Component({
  selector: "app-location-card",
  standalone: false,
  templateUrl: "./location-card.html",
  styleUrls: ["./location-card.scss"],
})
export class LocationCardComponent {
  @Input() data: LocationCardData = {
    areas: ["Indoor", "Outdoor", "2 Aree"],
    description:
      "The Fillmore offers a main indoor stage and a relaxed outdoor patio area. Capacity is limited to ensure a comfortable experience.",
    crowdLevel: 60,
  }

  @Input() isHighlighted = false
}
