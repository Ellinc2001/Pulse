import { Component, Input } from "@angular/core"
import { ModalController } from "@ionic/angular"
import { Router } from "@angular/router"
import { UserProfileModalService } from "src/app/services/user-profile-modal-service"

interface Invite {
  id: string
  eventTitle: string
  fromUser: string
  fromUserId?: string
  avatarUrl?: string
  avatarText?: string
  countdownNumber: string
  countdownUnit: string
  countdownColor: string
}

@Component({
  selector: "app-invites-modal",
  templateUrl: "./invites-modal.component.html",
  styleUrls: ["./invites-modal.component.scss"],
  standalone: false,
})
export class InvitesModalComponent {
  @Input() invites: Invite[] = [
    {
      id: "invite-1",
      eventTitle: "Warehouse Party",
      fromUser: "@dj_alex",
      avatarText: "WP",
      countdownNumber: "02",
      countdownUnit: "DAYS",
      countdownColor: "#a855f7",
    },
    {
      id: "invite-2",
      eventTitle: "Indie Film Screening",
      fromUser: "Cinephiles Group",
      avatarUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
      countdownNumber: "18",
      countdownUnit: "HOURS",
      countdownColor: "#ec4899",
    },
    {
      id: "invite-3",
      eventTitle: "Art Gallery Vernissage",
      fromUser: "@arte_viva",
      avatarUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=150&h=150&fit=crop&crop=face",
      countdownNumber: "05",
      countdownUnit: "DAYS",
      countdownColor: "#06b6d4",
    },
    {
      id: "invite-4",
      eventTitle: "Techno Underground Night",
      fromUser: "@techno_beats",
      avatarText: "TU",
      countdownNumber: "01",
      countdownUnit: "WEEK",
      countdownColor: "#8b5cf6",
    },
    {
      id: "invite-5",
      eventTitle: "Rooftop Sunset Session",
      fromUser: "@sunset_vibes",
      avatarUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=150&fit=crop&crop=face",
      countdownNumber: "03",
      countdownUnit: "DAYS",
      countdownColor: "#3b82f6",
    },
    {
      id: "invite-6",
      eventTitle: "Jazz Night Special",
      fromUser: "@jazz_club",
      avatarText: "JN",
      countdownNumber: "10",
      countdownUnit: "HOURS",
      countdownColor: "#f59e0b",
    },
  ]
  currentPage: number =0
  itemsPerPage: number =0

  constructor(
    private modalController: ModalController,
    private router: Router,
    private userProfileModalService: UserProfileModalService,
  ) {
    console.log("[v0] InvitesModal initialized with invites:", this.invites.length)
  }

  get totalPages(): number {
    return Math.ceil(this.invites.length / this.itemsPerPage)
  }

  get paginatedInvites(): Invite[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    return this.invites.slice(startIndex, startIndex + this.itemsPerPage)
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1)
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--
    }
  }

  goToPage(page: number) {
    this.currentPage = page
  }

  dismiss() {
    console.log("[v0] InvitesModal dismissed")
    this.modalController.dismiss()
  }

  openInviteDetail(inviteId: string) {
    const invite = this.invites.find((inv) => inv.id === inviteId)
    this.router.navigate(["/group-detail"])

  }

  async openUserProfile(invite: Invite, event: Event) {
    event.stopPropagation()
    console.log("[v0] Opening user profile:", invite.fromUser)

    // Mock user data - in real app, fetch from backend
    const userData = {
      id: invite.fromUserId || invite.id,
      name: invite.fromUser.replace("@", ""),
      username: invite.fromUser,
      avatarUrl: invite.avatarUrl || "https://i.pravatar.cc/150?img=1",
      bio: "Event enthusiast",
      location: "Milano, IT",
      interests: ["Music", "Art", "Events"],
      stats: { events: 42, friends: 156, sparks: 89 },
    }

    await this.userProfileModalService.openUserProfile(userData)
  }
}
