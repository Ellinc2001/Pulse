import { Component, Input } from "@angular/core"
import { ModalController } from "@ionic/angular"
import { Router } from "@angular/router"

interface CountdownEvent {
  id: string
  name: string
  venue: string
  icon: string
  countdown: string
  isUrgent?: boolean
  imageUrl?: string
  pillColor?: "blue" | "pink" | "purple"
  countdownNumber?: string
  countdownUnit?: string
  countdownColor?: string
}

@Component({
  selector: "app-countdown-events-modal",
  templateUrl: "./countdown-events-modal.component.html",
  styleUrls: ["./countdown-events-modal.component.scss"],
  standalone: false,
})
export class CountdownEventsModalComponent {
  @Input() events: CountdownEvent[] = [
    {
      id: "1",
      name: "Cosmic Gate",
      venue: "Club XYZ",
      icon: "musical-notes",
      countdown: "3 days",
      isUrgent: false,
      imageUrl: "https://images.unsplash.com/photo-1571266028243-d220c6a927d0?w=800&h=600&fit=crop",
      pillColor: "purple",
      countdownNumber: "03",
      countdownUnit: "DAYS",
      countdownColor: "#a855f7",
    },
    {
      id: "2",
      name: "Techno Rave",
      venue: "Warehouse District",
      icon: "headset",
      countdown: "1 week",
      isUrgent: false,
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
      pillColor: "blue",
      countdownNumber: "01",
      countdownUnit: "WEEK",
      countdownColor: "#06b6d4",
    },
    {
      id: "3",
      name: "Sunrise After",
      venue: "Rooftop Bar",
      icon: "sunny",
      countdown: "18 hours",
      isUrgent: true,
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      pillColor: "pink",
      countdownNumber: "18",
      countdownUnit: "HOURS",
      countdownColor: "#ec4899",
    },
    {
      id: "4",
      name: "Jazz Night",
      venue: "Blue Note",
      icon: "mic",
      countdown: "10 days",
      isUrgent: false,
      imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
      pillColor: "purple",
      countdownNumber: "10",
      countdownUnit: "DAYS",
      countdownColor: "#8b5cf6",
    },
    {
      id: "5",
      name: "Electronic Festival",
      venue: "City Park",
      icon: "flash",
      countdown: "2 weeks",
      isUrgent: false,
      imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
      pillColor: "blue",
      countdownNumber: "02",
      countdownUnit: "WEEKS",
      countdownColor: "#3b82f6",
    },
  ]

  viewMode: "compact" | "expanded" = "compact"

  constructor(
    private modalController: ModalController,
    private router: Router,
  ) {}

  toggleView(view: "compact" | "expanded") {
    this.viewMode = view
  }

  dismiss() {
    this.modalController.dismiss()
  }

  async openEventDetail(eventId: string) {
    await this.modalController.dismiss()
    this.router.navigate(["/event-detail", eventId])
  }
}
