import { Component, Input } from "@angular/core"

// event-card.ts
export interface EventData {
  id: string;
  title: string;
  category: string;
  location: string;
  distance: number;           // 
  imageUrl: string;
  coordinates: [number, number];
  color: string;
  description: string;
  attendees: any;
  time: string;
  date: Date
}


@Component({
  selector: "app-event-card",
  standalone: false,
  templateUrl: "./event-card.html",
  styleUrls: ["./event-card.scss"],
})

export class EventCardComponent {
  @Input() event!: EventData
  @Input() cardId!: string

  getRgbFromHex(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
      const r = Number.parseInt(result[1], 16)
      const g = Number.parseInt(result[2], 16)
      const b = Number.parseInt(result[3], 16)
      return `${r}, ${g}, ${b}`
    }
    return "77, 255, 203" // fallback
  }
}
