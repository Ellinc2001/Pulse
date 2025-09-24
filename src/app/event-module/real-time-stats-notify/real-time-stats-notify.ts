import { Component, type OnInit } from "@angular/core"
import { Location } from "@angular/common"

@Component({
  selector: "app-real-time-stats-notify",
  templateUrl: "./real-time-stats-notify.html",
  styleUrls: ["./real-time-stats-notify.scss"],
  standalone: false,
})
export class RealTimeStatsNotify implements OnInit {
  // Queue time selection
  selectedQueueTime = "0"

  // Sensory & Comfort controls
  hazeLevel = 4
  volumeLevel = 3
  stroboLevel = "basso"
  thermalComfort = "ok"

  // Ambiente & Servizi controls
  ventilationRating = 3
  bathroomRating = 2
  seatingAvailable = true

  // Vibe & Energia controls
  energyLevel = 4
  selectedMoods: string[] = ["Euforico", "Sognante"]
  moodOptions: string[] = ["Chill", "Euforico", "Rilassato", "Scatenato", "Sognante", "Nostalgico"]

  // Sicurezza & Qualità controls
  securityRating = 3
  drinkRating = 3

  constructor(private location: Location) {}

  ngOnInit() {
    // Initialize component
  }

  // Navigation methods
  goBack() {
    this.location.back()
  }

  // Queue time selection
  selectQueueTime(time: string) {
    this.selectedQueueTime = time
  }

  // Mood selection (multi-select)
  toggleMood(mood: string) {
    const index = this.selectedMoods.indexOf(mood)
    if (index > -1) {
      this.selectedMoods.splice(index, 1)
    } else {
      this.selectedMoods.push(mood)
    }
  }

  // Chat functionality
  openChat() {
    // Implement chat functionality
    console.log("Opening chat...")
  }

  // Submit data (could be used to send data to real-time-stats component)
  submitData() {
    const statsData = {
      queueTime: this.selectedQueueTime,
      haze: this.hazeLevel,
      volume: this.volumeLevel,
      strobo: this.stroboLevel,
      thermal: this.thermalComfort,
      ventilation: this.ventilationRating,
      bathroom: this.bathroomRating,
      seating: this.seatingAvailable,
      energy: this.energyLevel,
      moods: this.selectedMoods,
      security: this.securityRating,
      drinks: this.drinkRating,
    }

    console.log("Submitting stats data:", statsData)
    // Here you would typically send this data to a service
    // that updates the real-time-stats component
  }
}
