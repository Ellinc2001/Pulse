import { Component, Input } from "@angular/core"
import { NavController } from "@ionic/angular"

interface Participant {
  id: string
  name: string
  initial: string
  gradientFrom: string
  gradientTo: string
}

interface WorkGroup {
  id: string
  icon: string
  name: string
}

@Component({
  selector: "app-coworking-stats",
  templateUrl: "./coworking-stats-component.html",
  styleUrls: ["./coworking-stats-component.scss"],
  standalone: false
})
export class CoworkingStatsComponent {
  @Input() venueName = "Study Loft"
  @Input() venueAddress = "Via delle Scienze, 12"

  availableSeats = 12
  totalSeats = 40
  statusLabel = "Tranquillo"

  noiseLevel = 25 // percentage
  noiseLevelLabel = "Silenzioso"

  powerOutlets = 8
  powerOutletsLocation = "Zona Finestra"

  wifiStrength = 5 // 1-5 bars
  wifiLabel = "Ottima per video call"

  participants: Participant[] = [
    { id: "1", name: "Giulia", initial: "G", gradientFrom: "#256af4", gradientTo: "#60a5fa" },
    { id: "2", name: "Luca", initial: "L", gradientFrom: "#a855f7", gradientTo: "#ec4899" },
    { id: "3", name: "Marco", initial: "M", gradientFrom: "#10b981", gradientTo: "#14b8a6" },
  ]
  additionalParticipants = 14

  workGroups: WorkGroup[] = [
    { id: "1", icon: "server-outline", name: "Database" },
    { id: "2", icon: "code-slash-outline", name: "Coding" },
    { id: "3", icon: "color-palette-outline", name: "Design" },
  ]

  constructor(private navController: NavController) {}

  goBack() {
    this.navController.back()
  }

  bookSeat() {
    console.log("Booking seat...")
  }

  viewParticipants() {
    console.log("Viewing participants...")
  }

  exploreWorkGroups() {
    console.log("Exploring work groups...")
  }

  askForHelp() {
    console.log("Asking for help...")
  }
}
