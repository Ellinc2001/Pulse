import { Component, Input } from "@angular/core"
import { NavController } from "@ionic/angular"

interface OpenQuestion {
  text: string
  votes: number
}

interface PollOption {
  label: string
  percentage: number
  color: "blue" | "purple"
}

interface Participant {
  initial: string
  colorFrom: string
  colorTo: string
}

@Component({
  selector: "app-talk-stats",
  templateUrl: "./talk-stats-component.html",
  styleUrls: ["./talk-stats-component.scss"],
  standalone: false
})
export class TalkStatsComponent {
  @Input() eventName = "AI & Society"
  @Input() eventType = "Live Talk"
  @Input() isLive = true

  // Attendance
  currentAttendees = 128
  maxCapacity = 200

  get attendancePercentage(): number {
    return (this.currentAttendees / this.maxCapacity) * 100
  }

  get attendanceStatus(): string {
    if (this.attendancePercentage >= 80) return "Sala quasi piena"
    if (this.attendancePercentage >= 50) return "Buona affluenza"
    return "Posti disponibili"
  }

  // Talk topic
  talkTopic = "Etica dell'AI nel lavoro"
  talkTags = ["AI", "Etica", "Lavoro"]

  // Rating
  rating = 4.5
  maxRating = 5

  get ratingPercentage(): number {
    return (this.rating / this.maxRating) * 100
  }

  // Open questions
  openQuestions: OpenQuestion[] = [
    { text: "Come cambierà il welfare con l'automazione?", votes: 23 },
    { text: "Quali sono i rischi legati ai bias algoritmici?", votes: 18 },
    { text: "Chi è responsabile per gli errori dell'AI?", votes: 12 },
  ]

  // Live polls
  polls: PollOption[] = [
    { label: "Ottimista", percentage: 42, color: "blue" },
    { label: "Preoccupato", percentage: 36, color: "purple" },
  ]

  // Participants
  participants: Participant[] = [
    { initial: "G", colorFrom: "#256af4", colorTo: "#60a5fa" },
    { initial: "L", colorFrom: "#a855f7", colorTo: "#ec4899" },
    { initial: "M", colorFrom: "#34d399", colorTo: "#14b8a6" },
  ]
  additionalParticipants = 14

  constructor(private navController: NavController) {}

  goBack() {
    this.navController.back()
  }

  viewAllQuestions() {
    console.log("View all questions")
  }

  viewAllParticipants() {
    console.log("View all participants")
  }

  exploreGroups() {
    console.log("Explore groups")
  }

  askQuestion() {
    console.log("Ask question")
  }
}
