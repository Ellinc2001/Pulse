import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { UserProfileModalService } from "src/app/services/user-profile-modal-service"

interface Invite {
  id: string
  eventTitle: string
  fromUser: string
  avatarUrl?: string
  avatarText?: string
}

interface SparkUser {
  id: string
  name: string
  username: string
  avatarUrl: string
  socialLinks?: {
    instagram?: string
    facebook?: string
    tinder?: string
    tiktok?: string
  }
}

@Component({
  selector: "app-my-pulse",
  standalone: false,
  templateUrl: "./my-pulse.html",
  styleUrls: ["./my-pulse.scss"],
})
export class MyPulseComponent {
  sparkTab: "me" | "mine" = "me"

  sparkMeUsers: SparkUser[] = [
    {
      id: "user-1",
      name: "Sarah Johnson",
      username: "sarahj",
      avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      socialLinks: {
        instagram: "https://instagram.com/sarahj",
        tiktok: "https://tiktok.com/@sarahj",
      },
    },
    {
      id: "user-2",
      name: "Michael Chen",
      username: "mchen",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      socialLinks: {
        instagram: "https://instagram.com/mchen",
        facebook: "https://facebook.com/mchen",
      },
    },
    {
      id: "user-3",
      name: "Emma Wilson",
      username: "emmaw",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      socialLinks: {
        instagram: "https://instagram.com/emmaw",
        tiktok: "https://tiktok.com/@emmaw",
      },
    },
    {
      id: "user-4",
      name: "David Martinez",
      username: "davidm",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      socialLinks: {
        facebook: "https://facebook.com/davidm",
        tinder: "https://tinder.com/@davidm",
      },
    },
    {
      id: "user-5",
      name: "Olivia Brown",
      username: "oliviab",
      avatarUrl: "https://images.unsplash.com/photo-1544005313942-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      socialLinks: {
        instagram: "https://instagram.com/oliviab",
        tiktok: "https://tiktok.com/@oliviab",
      },
    },
  ]

  mySparkUsers: SparkUser[] = [
    {
      id: "user-6",
      name: "James Anderson",
      username: "janderson",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      socialLinks: {
        instagram: "https://instagram.com/janderson",
        facebook: "https://facebook.com/janderson",
      },
    },
    {
      id: "user-7",
      name: "Sophia Lee",
      username: "sophial",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      socialLinks: {
        instagram: "https://instagram.com/sophial",
        tiktok: "https://tiktok.com/@sophial",
      },
    },
    {
      id: "user-8",
      name: "Ryan Taylor",
      username: "ryant",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      socialLinks: {
        instagram: "https://instagram.com/ryant",
        facebook: "https://facebook.com/ryant",
        tinder: "https://tinder.com/@ryant",
      },
    },
  ]

  invites: Invite[] = [
    {
      id: "invite-1",
      eventTitle: "Warehouse Party",
      fromUser: "@dj_alex",
      avatarText: "@d_j",
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
      avatarText: "@tb",
    },
  ]

  constructor(
    private router: Router,
    private userProfileModalService: UserProfileModalService,
  ) {}

  navigateToPreferences() {
    this.router.navigate(["/my-vibes", "preferences-config"])
  }

  acceptInvite(inviteId: string) {
    const index = this.invites.findIndex((invite) => invite.id === inviteId)
    if (index !== -1) {
      this.invites.splice(index, 1)
    }
  }

  declineInvite(inviteId: string) {
    const index = this.invites.findIndex((invite) => invite.id === inviteId)
    if (index !== -1) {
      this.invites.splice(index, 1)
    }
  }

  async openUserProfile(user: SparkUser) {
    const result = await this.userProfileModalService.openUserProfile({
      avatarUrl: user.avatarUrl,
      name: user.name,
      username: user.username,
      socialLinks: user.socialLinks || {},
    })

    if (result?.action === "spark") {
      console.log("[v0] Spark action for user:", user.id)
    } else if (result?.action === "message") {
      console.log("[v0] Message action for user:", user.id)
    }
  }
}
