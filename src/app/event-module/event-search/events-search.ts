import { Component, type OnInit, type AfterViewInit, ViewChild, type ElementRef } from "@angular/core"
import * as L from "leaflet"
import type { EventData } from "../event-card/event-card.ts"
import { Router } from "@angular/router"

@Component({
  selector: "app-events-search",
  standalone: false,
  templateUrl: "./events-search.html",
  styleUrls: ["./events-search.scss"],
})
export class EventsSearchComponent implements OnInit, AfterViewInit {
  @ViewChild("mapContainer", { static: false }) mapContainer!: ElementRef

  private map!: L.Map
  private markers: L.Marker[] = []

  selectedCategory = "All"
  categories = ["All", "Music", "Sports", "Comedy", "Art", "Food", "Tech"]

events: EventData[] = [
  {
    id: "1",
    title: "Indie Rock Night",
    category: "Music",
    location: "The Fillmore",
    distance: 1.2,
    imageUrl: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=1200&q=80",
    coordinates: [37.7849, -122.4094],
    color: "#4dffcb",
    description: 'Musica e indie e sesso live',
    attendees: ['boh'],
    time: '19:20',
    date: new Date()
  },
  {
    id: "2",
    title: "Stand-Up Showcase",
    category: "Comedy",
    location: "Punch Line",
    distance: 2.5,
    imageUrl: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1200&q=80",
    coordinates: [37.7849, -122.4194],
    color: "#ff4da6",
    description: 'Stand up e sesso live',
    attendees: ['boh'],
    time: '13:30',
    date: new Date()
  },
  {
    id: "3",
    title: "Modern Art Exhibition",
    category: "Art",
    location: "SFMOMA",
    distance: 0.8,
    imageUrl: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=1200&q=80",
    coordinates: [37.7749, -122.4094],
    color: "#4da6ff",
    description: 'Modern art e sesso live',
    attendees: ['boh'],
    time: '18:00',
    date: new Date()

  },
];

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Sono qui')
  }

  ngAfterViewInit() {
    this.initializeMap()
  }

  private initializeMap() {
    // Initialize map with dark theme
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [37.7749, -122.4194],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    })

    // Add dark tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "",
    }).addTo(this.map)

    // Add custom zoom control
    L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(this.map)

    // Add markers for events
    this.addEventMarkers()
  }

  private addEventMarkers() {
    this.events.forEach((event) => {
      // Create custom marker icon with event color
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: 16px;
            height: 16px;
            background-color: ${event.color};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(${this.getRgbFromHex(event.color)}, 0.6);
          "></div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      const marker = L.marker(event.coordinates, { icon: customIcon })
        .addTo(this.map)
        .on("click", () => this.scrollToEvent(event.id))

      this.markers.push(marker)
    })
  }

  private getRgbFromHex(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
      const r = Number.parseInt(result[1], 16)
      const g = Number.parseInt(result[2], 16)
      const b = Number.parseInt(result[3], 16)
      return `${r}, ${g}, ${b}`
    }
    return "77, 255, 203"
  }

  private scrollToEvent(eventId: string) {
    const element = document.getElementById(`event-${eventId}`)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })

      // Add highlight effect
      element.style.transform = "scale(1.02)"
      element.style.transition = "transform 0.3s ease"

      setTimeout(() => {
        element.style.transform = "scale(1)"
      }, 300)
    }
  }

  selectCategory(category: string) {
    this.selectedCategory = category
  }

  openFullMap() {
    console.log("Opening full map view")
  }

  goBack() {
    console.log("Going back")
  }

  navigateToEventDetail(event: EventData): void {
    console.log('Event: ', event)
    this.router.navigate(['event/detail'], { state: { event } });
  }
}
