import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"

export interface EventData {
  id: string
  name: string
  address: string
  type: 'nightclub' | 'bar' | 'restaurant' | 'venue' | 'cafe'
  status: 'busy' | 'very busy' | 'popular' | 'quiet'
  distance: number
  activity: string
  lat: number
  lng: number
  color: 'red' | 'yellow' | 'cyan' | 'green' | 'purple' | 'orange' | 'pink' | 'blue'
}

@Component({
  selector: "event-card",
  standalone: false,
  templateUrl: "./event-card.html",
  styleUrls: ["./event-card.scss"],
})
export class EventCardComponent {
  @Input() event: EventData = {
    id: '1',
    name: "Electro Pulse Night",
    address: "Via Roma 42, Milano",
    type: "nightclub",
    status: "popular",
    distance: 0.5,
    activity: "DJ Set",
    lat: 40.9146,
    lng: 14.7903,
    color: "cyan"
  }

  @Input() animationDelay = 0

  @Output() eventClick = new EventEmitter<EventData>()
  @Output() detailsClick = new EventEmitter<EventData>()
  @Output() venueClick = new EventEmitter<EventData>()

  onCardClick() {
    this.eventClick.emit(this.event)
  }

  onDetailsClick(event: Event) {
    event.stopPropagation()
    this.detailsClick.emit(this.event)
  }

  onVenueClick(event: Event) {
    event.stopPropagation()
    this.venueClick.emit(this.event)
  }

  getAnimationDelay(): string {
    return `${this.animationDelay}s`
  }

  getStatusColor(): string {
    switch (this.event.status) {
      case 'very busy': return '#FF4757'
      case 'busy': return '#FFA502'
      case 'popular': return '#00E5CC'
      case 'quiet': return '#2ED573'
      default: return '#8B9DC3'
    }
  }

  // STESSI IDENTICI COLORI DEI MARKER SULLA MAPPA
  getCardColor(): string {
    switch (this.event.color) {
      case 'red': return '#FF4757'
      case 'yellow': return '#FFA502'
      case 'cyan': return '#00FFFF'
      case 'green': return '#2ED573'
      case 'purple': return '#8A2BE2'
      case 'orange': return '#FF8A00'
      case 'pink': return '#FF1493'
      case 'blue': return '#00BFFF'
      default: return '#00E5CC'
    }
  }
}
