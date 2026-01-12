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
  date?: string
}

@Component({
  selector: "app-invites-modal",
  templateUrl: "./invites-modal.component.html",
  styleUrls: ["./invites-modal.component.scss"],
  standalone: false,
})
export class InvitesModalComponent {
  @Input() invites: Invite[] = []

  currentPage = 1
  itemsPerPage = 6

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

  async openEventDetail(eventId: string, event: Event) {
    event.stopPropagation()
    console.log("[v0] Opening event detail from invite:", eventId)
    await this.modalController.dismiss()
    this.router.navigate(["/event-detail", eventId])
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
