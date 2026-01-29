import { Component, type OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { UserProfileModalService } from "src/app/services/user-profile-modal-service"
import { trigger, style, transition, animate } from "@angular/animations"
import { XpAnimationService } from "src/app/services/xp-lightning.service"
import { ModalController } from "@ionic/angular"
import { CountdownEventsModalComponent } from "src/app/modals/countdown-events-modal/countdown-events-modal.component"
import { InvitesModalComponent } from "src/app/modals/invites-modal/invites-modal.component"
import { SparksModalComponent } from "../sparks-modal/sparks-modal"

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
  timeUntil: any
  id: string
  eventTitle: string
  fromUser: string
  avatarUrl?: string
  avatarText?: string
  countdownColor?: string
  countdownNumber?: string
  countdownUnit?: string
}

interface CountdownEvent {
  id: string
  name: string
  venue: string
  icon: string
  countdown: string
  isUrgent?: boolean
  glowColor: string
  countdownColor: string
  countdownNumber: string
  countdownUnit: string
  imageUrl?: string
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

  sparksReceived = 23
  sparksGiven = 41

  groupSearchQuery = ""

  userGroups = [
    {
      id: "group-1",
      name: "Underground Berlin",
      coverImage: "https://images.unsplash.com/photo-1571266028243-d220c6a927d0?w=300&h=400&fit=crop",
    },
    {
      id: "group-2",
      name: "Neon Nights",
      coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=400&fit=crop",
    },
    {
      id: "group-3",
      name: "After Hour Crew",
      coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=400&fit=crop",
    },
    {
      id: "group-4",
      name: "Techno Lovers ITA",
      coverImage: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=300&h=400&fit=crop",
    },
  ]

  countdownEvents: CountdownEvent[] = [
    {
      id: "event-1",
      name: "Cosmic Gate Concert",
      venue: "Club XYZ",
      icon: "musical-notes",
      countdown: "3 days",
      glowColor: "rgba(168, 85, 247, 0.4)",
      countdownColor: "#a855f7",
      countdownNumber: "03",
      countdownUnit: "DAYS",
      imageUrl: "https://images.unsplash.com/photo-1571266028243-d220c6a927d0?w=800&h=600&fit=crop",
    },
    {
      id: "event-2",
      name: "Techno Rave Night",
      venue: "Warehouse District",
      icon: "headset",
      countdown: "1 week",
      glowColor: "rgba(6, 182, 212, 0.4)",
      countdownColor: "#06b6d4",
      countdownNumber: "01",
      countdownUnit: "WEEK",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
    },
    {
      id: "event-3",
      name: "Sunrise Afterparty",
      venue: "Rooftop Bar",
      icon: "partly-sunny",
      countdown: "18 hours",
      isUrgent: true,
      glowColor: "rgba(236, 72, 153, 0.4)",
      countdownColor: "#ec4899",
      countdownNumber: "18",
      countdownUnit: "HOURS",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    },
    {
      id: "event-4",
      name: "Jazz Night Live",
      venue: "Blue Note",
      icon: "mic",
      countdown: "10 days",
      glowColor: "rgba(139, 92, 246, 0.4)",
      countdownColor: "#8b5cf6",
      countdownNumber: "10",
      countdownUnit: "DAYS",
      imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
    },
    {
      id: "event-5",
      name: "Electronic Festival",
      venue: "City Park",
      icon: "flash",
      countdown: "2 weeks",
      glowColor: "rgba(59, 130, 246, 0.4)",
      countdownColor: "#3b82f6",
      countdownNumber: "02",
      countdownUnit: "WEEKS",
      imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
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
      timeUntil: 2,
      countdownColor: "#ec4899",
      countdownNumber: "18",
      countdownUnit: "HOURS",
    },
    {
      id: "invite-2",
      eventTitle: "Indie Film Screening",
      fromUser: "Cinephiles Group",
      avatarUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
      timeUntil: 2,
      countdownColor: "#ec4899",
      countdownNumber: "18",
      countdownUnit: "HOURS",
    },
    {
      id: "invite-3",
      eventTitle: "Art Gallery Vernissage",
      fromUser: "@arte_viva",
      avatarUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=150&h=150&fit=crop&crop=face",
      timeUntil: 2,
      countdownColor: "#ec4899",
      countdownNumber: "18",
      countdownUnit: "HOURS",
    },
    {
      id: "invite-4",
      eventTitle: "Techno Underground Night",
      fromUser: "@techno_beats",
      avatarText: "TU",
      timeUntil: 2,
      countdownColor: "#ec4899",
      countdownNumber: "18",
      countdownUnit: "HOURS",
    },
    {
      id: "invite-5",
      eventTitle: "Rooftop Sunset Session",
      fromUser: "@sunset_vibes",
      avatarUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=150&fit=crop&crop=face",
      timeUntil: 2,
      countdownColor: "#ec4899",
      countdownNumber: "18",
      countdownUnit: "HOURS",
    },
  ]

  sparksReceivedUsers = [
    {
      id: "sr1",
      name: "Marco Rossi",
      username: "@marco_rossi",
      avatarUrl: "https://i.pravatar.cc/150?img=11",
      eventsInCommon: 3,
      bio: "Music lover",
      location: "Milano",
      interests: ["Techno", "House"],
      stats: { events: 24, friends: 89, sparks: 45 },
    },
    {
      id: "sr2",
      name: "Luca Bianchi",
      username: "@luca_b",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      eventsInCommon: 1,
      bio: "DJ amateur",
      location: "Roma",
      interests: ["Electronic", "Indie"],
      stats: { events: 18, friends: 67, sparks: 32 },
    },
    {
      id: "sr3",
      name: "Elena Neri",
      username: "@elena_neri",
      avatarUrl: "https://i.pravatar.cc/150?img=13",
      eventsInCommon: 5,
      bio: "Event organizer",
      location: "Firenze",
      interests: ["Art", "Jazz"],
      stats: { events: 56, friends: 145, sparks: 78 },
    },
  ]

  sparksGivenUsers = [
    {
      id: "sg1",
      name: "Sofia Costa",
      username: "@sofia_c",
      avatarUrl: "https://i.pravatar.cc/150?img=21",
      eventsInCommon: 2,
      bio: "Festival enthusiast",
      location: "Torino",
      interests: ["Rock", "Alternative"],
      stats: { events: 31, friends: 98, sparks: 54 },
    },
    {
      id: "sg2",
      name: "Andrea Mancini",
      username: "@andrea_m",
      avatarUrl: "https://i.pravatar.cc/150?img=22",
      eventsInCommon: 4,
      bio: "Nightlife explorer",
      location: "Bologna",
      interests: ["Dance", "Electronic"],
      stats: { events: 42, friends: 123, sparks: 67 },
    },
  ]

  constructor(
    private router: Router,
    private userProfileModalService: UserProfileModalService,
    private xpAnimationService: XpAnimationService,
    private modalController: ModalController, // Added ModalController
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
    console.log("[v0] Opening countdown events modal with", this.countdownEvents.length, "events")
    const modal = await this.modalController.create({
      component: CountdownEventsModalComponent,
      componentProps: {
        events: this.countdownEvents,
      },
      cssClass: "countdown-events-modal-wrapper",
      backdropDismiss: true,
      showBackdrop: true,
    })

    await modal.present()
    console.log("[v0] Countdown events modal presented")
  }

  async openAllInvites() {
    console.log("[v0] Opening invites modal with", this.invites.length, "invites")
    const modal = await this.modalController.create({
      component: InvitesModalComponent,
      componentProps: {
        invites: this.invites,
      },
      cssClass: "invites-modal-wrapper",
      backdropDismiss: true,
      showBackdrop: true,
    })

    await modal.present()
    console.log("[v0] Invites modal presented")
  }

  async openSparksModal(tab: "received" | "given") {
    console.log("[v0] Opening sparks modal with tab:", tab)
    const modal = await this.modalController.create({
      component: SparksModalComponent,
      componentProps: {
        sparksReceived: this.sparksReceivedUsers,
        sparksGiven: this.sparksGivenUsers,
        initialTab: tab,
      },
      cssClass: "sparks-modal-wrapper",
      backdropDismiss: true,
      showBackdrop: true,
    })

    await modal.present()
    console.log("[v0] Sparks modal presented")
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

  createNewGroup() {
    this.router.navigate(["/my-vibes/create-group"])
  }

  openGroupDetail() {
    this.router.navigate(["/group-detail"])
    // TODO: Navigate to group detail page
  }
}
