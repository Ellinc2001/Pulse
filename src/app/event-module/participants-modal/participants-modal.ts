import { Component, Input, type OnInit } from "@angular/core"
import { ModalController } from "@ionic/angular"
import { UserProfileModalService } from "src/app/services/user-profile-modal-service"

export interface ParticipantData {
  id: string
  name: string
  username: string
  avatarUrl: string
  isSpark?: boolean
  isFollowing?: boolean
}

@Component({
  selector: "app-participants-modal",
  templateUrl: "./participants-modal.html",
  styleUrls: ["./participants-modal.scss"],
  standalone: false,
})
export class ParticipantsModalComponent implements OnInit {
  @Input() participants: ParticipantData[] = []
  @Input() totalCount = 0

  activeTab: "all" | "sparks" = "all"
  searchQuery = ""
  filteredParticipants: ParticipantData[] = []
  displayedParticipants: ParticipantData[] = []
  showMoreCount = 10

  constructor(
    private modalController: ModalController,
    private userProfileService: UserProfileModalService,
  ) {}

  ngOnInit() {
    console.log("[v0] ParticipantsModalComponent initialized with", this.participants.length, "participants")
    this.filterParticipants()
  }

  close() {
    this.modalController.dismiss()
  }

  switchTab(tab: "all" | "sparks") {
    this.activeTab = tab
    this.filterParticipants()
  }

  filterParticipants() {
    let filtered = [...this.participants]

    // Filter by tab
    if (this.activeTab === "sparks") {
      filtered = filtered.filter((p) => p.isSpark)
    }

    // Filter by search
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(query) || p.username.toLowerCase().includes(query),
      )
    }

    this.filteredParticipants = filtered
    this.displayedParticipants = filtered.slice(0, this.showMoreCount)
  }

  showMore() {
    this.showMoreCount += 10
    this.displayedParticipants = this.filteredParticipants.slice(0, this.showMoreCount)
  }

  async openUserProfile(participant: ParticipantData) {
    await this.userProfileService.openUserProfile({
      name: participant.name,
      username: participant.username,
      avatarUrl: participant.avatarUrl
    })
  }

  toggleFollow(participant: ParticipantData, event: Event) {
    event.stopPropagation()
    participant.isFollowing = !participant.isFollowing
  }
}
