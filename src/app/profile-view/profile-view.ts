import { Component, Input, Output, EventEmitter } from "@angular/core"
import { ModalController } from "@ionic/angular"

export interface ProfileData {
  avatarUrl: string
  name: string
  username: string
  isOnline?: boolean

  badges: { label: string; color: 'purple' | 'cyan' | 'pink' }[]

  // ✅ link social con URL di esempio
  socialLinks?: {
    instagram?: string
    tiktok?: string
    spotify?: string
    website?: string
  }

  // ✅ lo stai usando nel mock, quindi va definito
  mutualSpark?: {
    enabled: boolean
    otherUserAvatar: string
  }

  stats: {
    events: number
    sparks: number
    following: number
  }

  location: string
  interests: string[]

  vibesVideos: {
    id: string
    imageUrl: string
    venueName: string
    title: string
    isLive?: boolean
  }[]

  organizations: {
    id: string
    name: string
    type: string
    icon: string
    color: 'purple' | 'cyan' | 'pink'
  }[]

  bookedEvents: {
    id: string
    imageUrl: string
    title: string
    venue: string
    date: string
    gradientFrom: string
    gradientTo: string
  }[]
}

@Component({
  selector: "app-profile-view",
  templateUrl: "./profile-view.html",
  styleUrls: ["./profile-view.scss"],
  standalone: false
})
export class ProfileView {
  @Input() isOwnProfile: boolean = false

  @Output() onBack = new EventEmitter<void>()
  @Output() onSpark = new EventEmitter<string>()
  @Output() onMessage = new EventEmitter<string>()
  @Output() onEventClick = new EventEmitter<string>()
  @Output() onOrganizationClick = new EventEmitter<string>()
  @Output() onVideoClick = new EventEmitter<string>()

  // ✅ Mock completo con URL di esempio
  profileData: ProfileData = {
    avatarUrl: "https://i.pravatar.cc/300?img=12",
    name: "Giulia Rossi",
    username: "giulia.rossi",
    isOnline: true,

    badges: [
      { label: "VIP", color: "purple" },
      { label: "Creator", color: "cyan" },
    ],

    socialLinks: {
      instagram: "https://instagram.com/giulia.rossi",
      tiktok: "https://www.tiktok.com/@giulia.rossi",
      spotify: "https://open.spotify.com/user/giulia.rossi",
      website: "https://giuliarossi.example",
    },

    mutualSpark: {
      enabled: true,
      otherUserAvatar: "https://i.pravatar.cc/300?img=32",
    },

    stats: { events: 12, sparks: 48, following: 180 },
    location: "Milano, IT",
    interests: ["techno", "aperitivo", "concerti", "arte"],

    vibesVideos: [
      {
        id: "vid_001",
        imageUrl: "https://picsum.photos/seed/vibe001/600/800",
        venueName: "Fabrique",
        title: "Techno Night",
        isLive: true,
      },
      {
        id: "vid_002",
        imageUrl: "https://picsum.photos/seed/vibe002/600/800",
        venueName: "Alcatraz",
        title: "Indie Live Set",
      },
      {
        id: "vid_003",
        imageUrl: "https://picsum.photos/seed/vibe003/600/800",
        venueName: "Magazzini Generali",
        title: "DJ Session",
      },
    ],

    organizations: [
      { id: "org_001", name: "Club Milano", type: "Venue", icon: "musical-notes", color: "purple" },
      { id: "org_002", name: "Art Collective", type: "Community", icon: "color-palette", color: "cyan" },
      { id: "org_003", name: "Event Crew", type: "Organizer", icon: "people", color: "pink" },
    ],

    bookedEvents: [
      {
        id: "evt_001",
        imageUrl: "https://picsum.photos/seed/event001/600/600",
        title: "Night Party",
        venue: "Fabrique",
        date: "Sab 24 Feb",
        gradientFrom: "#7c3aed",
        gradientTo: "#06b6d4",
      },
      {
        id: "evt_002",
        imageUrl: "https://picsum.photos/seed/event002/600/600",
        title: "Live Concert",
        venue: "Alcatraz",
        date: "Ven 01 Mar",
        gradientFrom: "#ec4899",
        gradientTo: "#7c3aed",
      },
    ],
  }

  constructor(private modalController: ModalController) {}

  goBack() { this.onBack.emit() }
  sparkUser() { this.onSpark.emit(this.profileData.username) }
  messageUser() { this.onMessage.emit(this.profileData.username) }
  openEvent(eventId: string) { this.onEventClick.emit(eventId) }
  openOrganization(orgId: string) { this.onOrganizationClick.emit(orgId) }
  openVideo(videoId: string) { this.onVideoClick.emit(videoId) }

  getBadgeColorClass(color: string): string {
    switch (color) {
      case 'purple': return 'badge-purple'
      case 'cyan': return 'badge-cyan'
      case 'pink': return 'badge-pink'
      default: return 'badge-purple'
    }
  }

  getOrgIconColorClass(color: string): string {
    switch (color) {
      case 'purple': return 'org-icon-purple'
      case 'cyan': return 'org-icon-cyan'
      case 'pink': return 'org-icon-pink'
      default: return 'org-icon-purple'
    }
  }
}
