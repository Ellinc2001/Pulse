import { Component, type OnInit } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router"
import { ModalController } from "@ionic/angular"

export type TimelineData = {
  points: { label: string, position: number, color: string}[],
  currentTimePercent: number,
  currentTimeLabel: string
}

export type Participant = {
  id: string,
  name: string,
  avatarUrl: string,
  badge?: string
}

export type VideoStream = {
  id: string,
  title: string,
  url: string,
  thumbnail: string,
  isLive: boolean,
  viewers: number,
  quality: string,
  angle?: string
}

@Component({
  selector: "app-real-time-stats",
  templateUrl: "./real-time-stats.html",
  styleUrls: ["./real-time-stats.scss"],
  standalone: false,
})

export class RealTimeStatsComponent implements OnInit {
  carousels: any[] = [
    {
      id: "1",
      title: "Carousel 1",
      items: [
        { id: "1-1", imageUrl: "https://i.pravatar.cc/150?img=1" },
        { id: "1-2", imageUrl: "https://i.pravatar.cc/150?img=2" },
        { id: "1-3", imageUrl: "https://i.pravatar.cc/150?img=3" },
      ],
    },
    {
      id: "2",
      title: "Carousel 2",
      items: [
        { id: "2-1", imageUrl: "https://i.pravatar.cc/150?img=4" },
        { id: "2-2", imageUrl: "https://i.pravatar.cc/150?img=5" },
        { id: "2-3", imageUrl: "https://i.pravatar.cc/150?img=6" },
      ],
    },
  ]

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
    private router: Router,
    private modalController: ModalController,
  ) {}

  ngOnInit(): void {
    // No need to call getCarouselsForClub as carousels are now mockup data
  }

  back() {
    this.router.navigate(["/events-search"])
  }

  async openParticipantsModal() {
    const participantsData = this.participants.map((p, index) => ({
      id: p.id,
      name: p.name,
      username: `@${p.name.toLowerCase().replace(" ", "_")}`,
      avatarUrl: p.avatarUrl,
      isSpark: p.badge === "VIP" || index < 2,
      isFollowing: index === 2,
    }))

    const modal = await this.modalController.create({
      component: (await import("../participants-modal/participants-modal")).ParticipantsModalComponent,
      componentProps: {
        participants: participantsData,
        totalCount: 326,
      },
      cssClass: "participants-modal-wrapper",
      backdropDismiss: true,
      showBackdrop: true,
    })

    await modal.present()
  }
}
