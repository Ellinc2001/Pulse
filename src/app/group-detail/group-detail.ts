import { Component, type OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { NavController } from "@ionic/angular"

interface GroupMember {
  id: string
  name: string
  avatarUrl: string
  isAdmin?: boolean
}

interface PastVideo {
  id: string
  title: string
  thumbnailUrl: string
}

interface VibeTag {
  id: string
  label: string
  icon: string
  glowType: "magenta" | "cyan" | "none"
}

interface GroupAnnouncement {
  id: string
  authorName: string
  authorAvatar: string
  timeAgo: string
  text: string
  pinned?: boolean
}

interface GroupData {
  id: string
  name: string
  coverImage: string
  memberCount: string
  isActive: boolean
  vibes: VibeTag[]
  pastVideos: PastVideo[]
  members: GroupMember[]
  onlineCount: number
}

@Component({
  selector: "app-group-detail",
  templateUrl: "./group-detail.html",
  styleUrls: ["./group-detail.scss"],
  standalone: false
})
export class GroupDetailComponent implements OnInit {
shareGroup() {
throw new Error('Method not implemented.')
}

  groupAnnouncements: GroupAnnouncement[] = [
    {
      id: "a1",
      authorName: "Marco Rossini",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      timeAgo: "2h fa",
      text: "Ragazzi sabato sera ci troviamo alle 22:30 in Piazza Gae Aulenti. Portate il biglietto stampato o su telefono!",
      pinned: true,
    },
    {
      id: "a2",
      authorName: "Sara Bianchi",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      timeAgo: "1g fa",
      text: "Ho trovato un codice sconto del 20% per il prossimo evento. Lo condivido nel gruppo Telegram!",
      pinned: false,
    },
    {
      id: "a3",
      authorName: "Luca Verdi",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      timeAgo: "3g fa",
      text: "Chi viene al Berghain il mese prossimo? Stiamo organizzando un viaggio di gruppo!",
      pinned: false,
    },
    {
      id: "a4",
      authorName: "Elena Neri",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      timeAgo: "5g fa",
      text: "Playlist Spotify del gruppo aggiornata con le ultime tracce!",
      pinned: false,
    },
  ]

  get pinnedAnnouncement(): GroupAnnouncement | undefined {
    return this.groupAnnouncements.find(a => a.pinned)
  }

  get otherAnnouncements(): GroupAnnouncement[] {
    return this.groupAnnouncements.filter(a => !a.pinned)
  }

  groupData: GroupData = {
    id: "group-1",
    name: "Techno Lovers ITA",
    coverImage: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=400&h=500&fit=crop",
    memberCount: "1.4K",
    isActive: true,
    vibes: [
      { id: "v1", label: "Underground Techno", icon: "rocket", glowType: "magenta" },
      { id: "v2", label: "Berlin Style", icon: "wine-bar", glowType: "cyan" },
      { id: "v3", label: "Late Night", icon: "flame", glowType: "none" },
    ],
    pastVideos: [
      {
        id: "pv1",
        title: "Fabric London",
        thumbnailUrl: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=400&h=500&fit=crop",
      },
      {
        id: "pv2",
        title: "Awakenings 2024",
        thumbnailUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=500&fit=crop",
      },
    ],
    members: [
      {
        id: "m1",
        name: "Admin",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        isAdmin: true,
      },
      {
        id: "m2",
        name: "Marco",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      {
        id: "m3",
        name: "Sara",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
      {
        id: "m4",
        name: "Elena",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
    ],
    onlineCount: 12,
  }

  remainingMembersCount = 123
  showMembersModal = false

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
  ) {}

  ngOnInit() {
    const groupId = this.route.snapshot.paramMap.get("groupId")
    if (groupId) {
      this.loadGroupData(groupId)
    }
  }

  loadGroupData(groupId: string) {
    console.log("Loading group:", groupId)
  }

  goBack() {
    this.navController.back()
  }

  openOptions() {
    console.log("Opening options menu")
  }

  viewAllVideos() {
    console.log("View all videos")
  }

  playVideo(videoId: string) {
    console.log("Playing video:", videoId)
  }

  openMemberProfile(memberId: string) {
    this.navController.navigateForward(`/profile/${memberId}`)
  }

  joinGroup() {
    console.log("Joining group:", this.groupData.id)
  }
}
