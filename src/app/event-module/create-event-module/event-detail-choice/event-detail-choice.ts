import { Component } from "@angular/core"

@Component({
  selector: "app-event-detail-choice",
  templateUrl: "./event-detail-choice.html",
  styleUrls: ["./event-detail-choice.scss"],
  standalone: false
})
export class EventDetailChoiceComponent {
  eventName = ""
  eventDate = ""
  eventTime = ""
  eventVenue = ""
  eventImage: File | null = null

  constructor() {}

  onImageUpload(event: any): void {
    const file = event.target.files[0]
    if (file) {
      this.eventImage = file
      console.log("[v0] Image uploaded:", file.name)
    }
  }

  onCreateEvent(): void {
    const eventData = {
      name: this.eventName,
      date: this.eventDate,
      time: this.eventTime,
      venue: this.eventVenue,
      image: this.eventImage,
    }

    console.log("[v0] Creating event with data:", eventData)
    // Here you would typically call a service to create the event
  }

  isFormValid(): boolean {
    return !!(this.eventName && this.eventDate && this.eventTime && this.eventVenue)
  }
}
