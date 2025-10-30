import { Component, Input } from "@angular/core"

export interface MusicCardData {
  genres: string[]
  description: string
  energyLevel: number // 0-100
  timeline?: { time: string; artist: string }[]
}

@Component({
  selector: "app-music-card",
  standalone: false,
  templateUrl: "./music-card.html",
  styleUrls: ["./music-card.scss"],
})
export class MusicCardComponent {
  @Input() data: MusicCardData = {
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

  @Input() isHighlighted = false
  isExpanded = false

  toggleExpand() {
    this.isExpanded = !this.isExpanded
  }
}
