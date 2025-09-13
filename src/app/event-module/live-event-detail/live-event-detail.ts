import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import type { EventData } from "../event-card/event-card.ts"
import { VideoStream } from '../live-videos/live-videos.js';


@Component({
  selector: 'app-live-event-detail',
  standalone: false,
  templateUrl: './live-event-detail.html',
  styleUrl: './live-event-detail.scss'
})
export class LiveEventDetail {

  event: EventData | null = null;
  activeTab = 'stats';
  showStatsOverlay = false
  activeVideoIndex = 0;


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

  constructor(private router: Router) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.event = (nav?.extras?.state as any)?.event ?? null;

    if (!this.event && history.state?.event) {
      this.event = history.state.event as EventData;
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
    // Handle check-in functionality
    console.log("[v0] Check-in clicked")
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
    this.activeVideoIndex = i;
  // se usi ChangeDetectionStrategy.OnPush:
  // this.cdr.markForCheck();
  }
}
