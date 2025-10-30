import { Component } from "@angular/core"
import { Router } from "@angular/router"
import type { EventData } from "../event-card/event-card.ts"
import type { VideoStream } from "../live-videos/live-videos"
import { BadgeService } from "src/app/services/badge-service"


@Component({
  selector: "app-live-event-detail",
  standalone: false,
  templateUrl: "./live-event-detail.html",
  styleUrl: "./live-event-detail.scss",
})
export class LiveEventDetail {
  event: EventData | null = null
  activeTab = "stats"
  showStatsOverlay = false
  activeVideoIndex = 0
  isCheckingIn = false
  showBadge = false

  activePill = "music"
  highlightedCard = "music"

  musicData = {
    genres: ["House", "Indie", "Rock"],
    description:
      'Live performance by "The Vantages" followed by DJ sets from local artists. Expect high-energy indie rock anthems and deep house vibes.',
    energyLevel: 75,
    timeline: [
      { time: "20:00 - 21:30", artist: "DJ Warmup Set" },
      { time: "21:30 - 23:00", artist: "The Vantages (Live)" },
      { time: "23:00 - END", artist: "Closing DJ Set" },
    ],
  }

  foodData = {
    tags: ["Cocktail", "GF", "Vegan"],
    description:
      'Signature cocktail "The Indie Spark" available. A selection of craft beers and gourmet street food with gluten-free and vegan options.',
    menuCategories: ["Cocktails", "Craft Beer", "Street Food", "Soft Drinks"],
    menuDetails: [
      { name: "Indie Spark", description: "Gin, Elderflower, Lime" },
      { name: "Rock Burger", description: "Beyond Meat patty option available" },
    ],
  }

  locationData = {
    areas: ["Indoor", "Outdoor", "2 Aree"],
    description:
      "The Fillmore offers a main indoor stage and a relaxed outdoor patio area. Capacity is limited to ensure a comfortable experience.",
    crowdLevel: 60,
  }

  statsData = {
    attendees: {
      onSite: 23,
      arriving: 7,
    },
    vibe: "Si scalda",
    availability: "Quasi Finito",
    travelTime: "~25 min",
    eventHeat: 2, // out of 3
    ratings: {
      average: 4.2,
      favorites: 4.8,
    },
    pricing: "€€",
    currentArtist: "Artista Principale",
    nextArtist: "DJ Set Closing",
    nextArtistTime: "45 min",
  }

  videoStreams: VideoStream[] = [
    {
      id: "main",
      title: "Main Stage",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
      isLive: true,
      viewers: 1247,
      quality: "FHD",
    },
    {
      id: "stage2",
      title: "Techno Beats",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
      isLive: true,
      viewers: 892,
      quality: "HD",
      angle: "DJ Booth",
    },
    {
      id: "crowd",
      title: "Crowd Energy",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
      isLive: true,
      viewers: 654,
      quality: "HD",
      angle: "Audience View",
    },
    {
      id: "vip",
      title: "VIP Lounge",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
      isLive: true,
      viewers: 321,
      quality: "FHD",
      angle: "Exclusive Area",
    },
    {
      id: "backstage",
      title: "Behind Scenes",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
      isLive: false,
      viewers: 156,
      quality: "HD",
      angle: "Backstage",
    },
    {
      id: "aerial",
      title: "Aerial View",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
      isLive: true,
      viewers: 445,
      quality: "4K",
      angle: "Drone Camera",
    },
  ]

  constructor(
    private router: Router,
    private badgeService: BadgeService,
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation()
    this.event = (nav?.extras?.state as any)?.event ?? null

    if (!this.event && history.state?.event) {
      this.event = history.state.event as EventData
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab
  }

  onBackClick() {
    // Handle back navigation
    console.log("[v0] Back button clicked")
  }

  onShareClick() {
    // Handle share functionality
    console.log("[v0] Share button clicked")
  }

  onFavoriteClick() {
    // Handle favorite toggle
    console.log("[v0] Favorite button clicked")
  }

  onCheckIn() {
    this.isCheckingIn = true

    // Simulate check-in process with animation
    setTimeout(() => {
      this.isCheckingIn = false
      this.showBadge = true

      if (this.event) {
        this.badgeService.showBadge(this.event)
      }

      console.log("[v0] Check-in completed, badge shown via service")
    }, 2000) // 2 second animation

    console.log("[v0] Check-in animation started")
  }

  onCheckOut() {
    // Handle check-out functionality
    console.log("[v0] Check-out clicked")
  }

  openChat() {
    // Handle opening chat
    console.log("[v0] Chat opened")
  }

  openStatsOverlay() {
    this.showStatsOverlay = true
    console.log("[v0] Stats overlay opened")
  }

  closeStatsOverlay() {
    this.showStatsOverlay = false
    console.log("[v0] Stats overlay closed")
  }

  setActive(i: number) {
    this.activeVideoIndex = i
    // se usi ChangeDetectionStrategy.OnPush:
    // this.cdr.markForCheck();
  }

  onPillClick(pill: string) {
    this.activePill = pill
    this.highlightedCard = pill
    console.log("[v0] Pill clicked:", pill)
  }

  navigateToEventToRealimeStats(): void {
    this.router.navigate(['event/real-time-stats'], { state: { event: this.event } });
  }
}
