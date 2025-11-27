import { Component, type OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { UserProfileModalService } from "src/app/services/user-profile-modal-service"
import { trigger, style, transition, animate } from "@angular/animations"
import { XpAnimationService } from "src/app/services/xp-lightning.service"

interface UserData {
  id: string
  name: string
  username: string
  avatarUrl: string
  bio: string
  location: string
  interests: string[]
  stats: {
    events: number
    friends: number
    sparks: number
  }
}

interface Invite {
  id: string
  eventTitle: string
  fromUser: string
  avatarUrl?: string
  avatarText?: string
}

interface CountdownEvent {
  id: string
  name: string
  venue: string
  icon: string
  countdown: string
  isUrgent?: boolean
}

interface Level {
  number: number
  name: string
  description: string
  xpThreshold: number
}

@Component({
  selector: "app-my-pulse",
  templateUrl: "./my-pulse.html",
  styleUrls: ["./my-pulse.scss"],
  standalone: false,
  animations: [
    trigger("inviteAnimation", [
      transition(":leave", [
        animate(
          "300ms ease-out",
          style({
            opacity: 0,
            transform: "translateX(100px)",
          }),
        ),
      ]),
    ]),
  ],
})
export class MyPulseComponent implements OnInit {
  sparkTab: "me" | "mine" = "me"
  eventsTab: "countdown" | "invites" = "countdown"

  currentXP = 4250

  countdownEvents: CountdownEvent[] = [
    {
      id: "event-1",
      name: "Cosmic Gate Concert",
      venue: "Club XYZ",
      icon: "musical-notes",
      countdown: "3 days",
    },
    {
      id: "event-2",
      name: "Techno Rave Night",
      venue: "Warehouse District",
      icon: "headset",
      countdown: "1 week",
    },
    {
      id: "event-3",
      name: "Sunrise Afterparty",
      venue: "Rooftop Bar",
      icon: "partly-sunny",
      countdown: "18 hours",
      isUrgent: true,
    },
    {
      id: "event-4",
      name: "Jazz Night Live",
      venue: "Blue Note",
      icon: "mic",
      countdown: "10 days",
    },
    {
      id: "event-5",
      name: "Electronic Festival",
      venue: "City Park",
      icon: "flash",
      countdown: "2 weeks",
    },
  ]

  levels: Level[] = [
    { number: 1, name: "Urban Scout", description: "Sei all'inizio, stai esplorando.", xpThreshold: 0 },
    {
      number: 2,
      name: "City Wanderer",
      description: "Ti muovi curioso, inizi a capire dove andare.",
      xpThreshold: 250,
    },
    {
      number: 3,
      name: "Social Seeker",
      description: "Non guardi solo: inizi a cercare persone e contesti.",
      xpThreshold: 700,
    },
    {
      number: 4,
      name: "Urban Pathfinder",
      description: "Sai scegliere luoghi e gruppi adatti a te.",
      xpThreshold: 1400,
    },
    { number: 5, name: "Social Anchor", description: "Quando ci sei tu, il gruppo sta meglio.", xpThreshold: 2400 },
    { number: 6, name: "Crosslinker", description: "Fai da ponte tra cerchie diverse.", xpThreshold: 3800 },
    { number: 7, name: "Urban Guide", description: "Gli altri si fidano delle tue proposte.", xpThreshold: 5800 },
    {
      number: 8,
      name: "City Cartographer",
      description: 'Hai "mappato" la città in momenti e vibes.',
      xpThreshold: 8500,
    },
    {
      number: 9,
      name: "Urban Navigator",
      description: "Ti muovi con naturalezza tra gruppi e situazioni.",
      xpThreshold: 12000,
    },
    { number: 10, name: "Urban Legend", description: "Sei un punto fisso del paesaggio sociale.", xpThreshold: 17000 },
  ]

  get currentLevel(): Level {
    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (this.currentXP >= this.levels[i].xpThreshold) {
        return this.levels[i]
      }
    }
    return this.levels[0]
  }

  get nextLevel(): Level | null {
    const currentIndex = this.levels.indexOf(this.currentLevel)
    return currentIndex < this.levels.length - 1 ? this.levels[currentIndex + 1] : null
  }

  get levelProgress(): number {
    if (!this.nextLevel) return 100
    const xpInCurrentLevel = this.currentXP - this.currentLevel.xpThreshold
    const xpNeededForNextLevel = this.nextLevel.xpThreshold - this.currentLevel.xpThreshold
    return Math.min((xpInCurrentLevel / xpNeededForNextLevel) * 100, 100)
  }

  get xpToNextLevel(): number {
    if (!this.nextLevel) return 0
    return this.nextLevel.xpThreshold - this.currentXP
  }

  get displayedCountdownEvents(): CountdownEvent[] {
    return this.countdownEvents.slice(0, 3)
  }

  get hasMoreCountdownEvents(): boolean {
    return this.countdownEvents.length > 3
  }

  get displayedInvites(): Invite[] {
    return this.invites.slice(0, 3)
  }

  get hasMoreInvites(): boolean {
    return this.invites.length > 3
  }

  sparkMeUsers: UserData[] = [
    {
      id: "u1",
      name: "Sofia Bianchi",
      username: "@sofiabianchi",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      bio: "Music lover and tech enthusiast",
      location: "Milano, IT",
      interests: ["Techno", "House", "Art"],
      stats: { events: 42, friends: 156, sparks: 89 },
    },
    {
      id: "u2",
      name: "Luca Moretti",
      username: "@lucamoretti",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      bio: "DJ and music producer",
      location: "Roma, IT",
      interests: ["Electronic", "Indie", "Jazz"],
      stats: { events: 67, friends: 234, sparks: 145 },
    },
    {
      id: "u3",
      name: "Giulia Conti",
      username: "@giuliaconti",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      bio: "Art curator and event organizer",
      location: "Firenze, IT",
      interests: ["Art", "Culture", "Live Music"],
      stats: { events: 38, friends: 198, sparks: 112 },
    },
  ]

  mySparkUsers: UserData[] = [
    {
      id: "u4",
      name: "Marco Verdi",
      username: "@marcoverdi",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
      bio: "Festival enthusiast",
      location: "Torino, IT",
      interests: ["Rock", "Alternative", "Concerts"],
      stats: { events: 29, friends: 87, sparks: 56 },
    },
    {
      id: "u5",
      name: "Anna Rossi",
      username: "@annarossi",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      bio: "Nightlife explorer",
      location: "Bologna, IT",
      interests: ["Dance", "Electronic", "Clubs"],
      stats: { events: 51, friends: 176, sparks: 98 },
    },
  ]

  invites: Invite[] = [
    {
      id: "invite-1",
      eventTitle: "Warehouse Party",
      fromUser: "@dj_alex",
      avatarText: "WP",
    },
    {
      id: "invite-2",
      eventTitle: "Indie Film Screening",
      fromUser: "Cinephiles Group",
      avatarUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "invite-3",
      eventTitle: "Art Gallery Vernissage",
      fromUser: "@arte_viva",
      avatarUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "invite-4",
      eventTitle: "Techno Underground Night",
      fromUser: "@techno_beats",
      avatarText: "TU",
    },
    {
      id: "invite-5",
      eventTitle: "Rooftop Sunset Session",
      fromUser: "@sunset_vibes",
      avatarUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=150&fit=crop&crop=face",
    },
  ]

  constructor(
    private router: Router,
    private userProfileModalService: UserProfileModalService,
    private xpAnimationService: XpAnimationService,
  ) {}

  ngOnInit() {}

  goToPreferences() {
    this.router.navigate(["/preferences"])
  }

  openUserProfile(user: UserData) {
    this.userProfileModalService.openUserProfile(user)
  }

  acceptInvite(inviteId: string) {
    console.log("Accepted invite:", inviteId)
    this.invites = this.invites.filter((inv) => inv.id !== inviteId)
  }

  declineInvite(inviteId: string) {
    console.log("Declined invite:", inviteId)
    this.invites = this.invites.filter((inv) => inv.id !== inviteId)
  }

  openInviteDetail(inviteId: string) {
    console.log("Opening invite detail:", inviteId)
    // TODO: Navigate to invite detail page
  }

  async openAllCountdownEvents() {
    console.log("[v0] Opening all countdown events modal")
    // TODO: Implement modal service to show all countdown events
  }

  async openAllInvites() {
    console.log("[v0] Opening all invites modal")
    // TODO: Implement modal service to show all invites
  }

  testXpAnimation() {
    // Find the XP badge element
    const xpBadgeElement = document.querySelector(".xp-badge")
    if (xpBadgeElement) {
      // Trigger animation with 50 XP gain
      this.xpAnimationService.triggerXpGain({
        amount: 50,
        sourceElement: xpBadgeElement as HTMLElement,
      })

      // Simulate XP gain (in real app, this would come from backend)
      this.currentXP += 50
    }
  }
}
