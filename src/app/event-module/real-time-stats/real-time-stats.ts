import { Component, type OnInit } from "@angular/core"
import { ClubService } from "../services/club-service"
import { VideoStream } from "../ui-statistics-module/live-videos/live-videos"
import { TimelineData } from "../ui-statistics-module/minimal-timeline-card/minimal-timeline-card"
import { Participant } from "../ui-statistics-module/participants-avatars/participants-avatars"

@Component({
  selector: "app-real-time-stats",
  templateUrl: "./real-time-stats.html",
  styleUrls: ["./real-time-stats.scss"],
  standalone: false,
})
export class RealTimeStatsComponent implements OnInit {
  carousels: any[] = []

  eventTimeline: TimelineData = {
    points: [
      { label: "Apertura", position: 0, color: "green" },
      { label: "Warm-up", position: 25, color: "amber" },
      { label: "Peak Time", position: 60, color: "primary" },
      { label: "Chiusura", position: 100, color: "muted" },
    ],
    currentTimePercent: 45,
    currentTimeLabel: "Ora: 01:30",
  }

  participants: Participant[] = [
    {
      id: "1",
      name: "Marco Rossi",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      badge: "VIP",
    },
    {
      id: "2",
      name: "Laura Bianchi",
      avatarUrl: "https://i.pravatar.cc/150?img=45",
      badge: "Host",
    },
    {
      id: "3",
      name: "Giovanni Verdi",
      avatarUrl: "https://i.pravatar.cc/150?img=33",
    },
    {
      id: "4",
      name: "Sofia Neri",
      avatarUrl: "https://i.pravatar.cc/150?img=47",
    },
    {
      id: "5",
      name: "Luca Ferrari",
      avatarUrl: "https://i.pravatar.cc/150?img=15",
      badge: "VIP",
    },
    {
      id: "6",
      name: "Giulia Romano",
      avatarUrl: "https://i.pravatar.cc/150?img=23",
    },
    {
      id: "7",
      name: "Andrea Colombo",
      avatarUrl: "https://i.pravatar.cc/150?img=68",
    },
    {
      id: "8",
      name: "Francesca Ricci",
      avatarUrl: "https://i.pravatar.cc/150?img=29",
      badge: "VIP",
    },
    {
      id: "9",
      name: "Matteo Marino",
      avatarUrl: "https://i.pravatar.cc/150?img=51",
    },
    {
      id: "10",
      name: "Chiara Greco",
      avatarUrl: "https://i.pravatar.cc/150?img=38",
    },
    {
      id: "11",
      name: "Alessandro Bruno",
      avatarUrl: "https://i.pravatar.cc/150?img=14",
      badge: "VIP",
    },
    {
      id: "12",
      name: "Valentina Gallo",
      avatarUrl: "https://i.pravatar.cc/150?img=44",
    },
    {
      id: "13",
      name: "Davide Costa",
      avatarUrl: "https://i.pravatar.cc/150?img=56",
    },
    {
      id: "14",
      name: "Elena Fontana",
      avatarUrl: "https://i.pravatar.cc/150?img=31",
    },
    {
      id: "15",
      name: "Simone Caruso",
      avatarUrl: "https://i.pravatar.cc/150?img=62",
      badge: "VIP",
    },
  ]

  totalParticipants = 1200

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
  ]

  constructor(
    private clubService: ClubService,
  ) {}

  ngOnInit(): void {
    this.carousels = this.clubService.getCarouselsForClub()
  }

  back() {}
}
