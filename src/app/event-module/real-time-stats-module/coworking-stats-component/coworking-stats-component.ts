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

interface TopPerformer {
  id: string
  name: string
  initial: string
  gradientFrom: string
  gradientTo: string
  xp: string
  xpColor: string
  rankColor: string
  tasks: number
  focus: string
  badge: string
}

interface Intention {
  id: string
  name: string
  emoji: string
  message: string
  timeAgo: string
  type: "goal" | "help"
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

  intentions: Intention[] = [
    {
      id: "1",
      name: "Giulia",
      emoji: "🎯",
      message: "Voglio finire il capitolo 2 di Analisi entro le 18:00. Focus totale! 🎧",
      timeAgo: "2m ago",
      type: "goal",
    },
    {
      id: "2",
      name: "Luca",
      emoji: "❓",
      message: "Qualcuno mi dà una mano con React Hooks? Ho un loop infinito... 😅",
      timeAgo: "12m ago",
      type: "help",
    },
    {
      id: "3",
      name: "Matteo",
      emoji: "🙌",
      message: "Pausa caffè? Sono disponibile per chiacchiere su Swift o Tech in generale.",
      timeAgo: "35m ago",
      type: "goal",
    },
  ]

  topPerformers: TopPerformer[] = [
    {
      id: "1",
      name: "Alice M.",
      initial: "AM",
      gradientFrom: "#6366f1",
      gradientTo: "#a855f7",
      xp: "2,450",
      xpColor: "#a855f7",
      rankColor: "#a855f7",
      tasks: 12,
      focus: "4h 20m",
      badge: "Marathoner",
    },
    {
      id: "2",
      name: "Luca S.",
      initial: "LS",
      gradientFrom: "#3b82f6",
      gradientTo: "#22d3ee",
      xp: "2,100",
      xpColor: "#256af4",
      rankColor: "#256af4",
      tasks: 9,
      focus: "3h 45m",
      badge: "Helper",
    },
    {
      id: "3",
      name: "Giulia M.",
      initial: "GM",
      gradientFrom: "#ec4899",
      gradientTo: "#f43f5e",
      xp: "1,850",
      xpColor: "#f472b6",
      rankColor: "#ec4899",
      tasks: 8,
      focus: "3h 10m",
      badge: "Sprinter",
    },
    {
      id: "4",
      name: "Davide R.",
      initial: "DR",
      gradientFrom: "#10b981",
      gradientTo: "#14b8a6",
      xp: "1,620",
      xpColor: "#34d399",
      rankColor: "#10b981",
      tasks: 7,
      focus: "2h 55m",
      badge: "Rookie",
    },
    {
      id: "5",
      name: "Elena L.",
      initial: "EL",
      gradientFrom: "#f97316",
      gradientTo: "#fbbf24",
      xp: "1,450",
      xpColor: "#fb923c",
      rankColor: "#f97316",
      tasks: 6,
      focus: "2h 15m",
      badge: "Break",
    },
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
