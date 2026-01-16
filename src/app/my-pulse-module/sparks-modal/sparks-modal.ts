import { Component, Input, type OnInit } from "@angular/core"
import { ModalController } from "@ionic/angular"
import { UserProfileModalService } from "src/app/services/user-profile-modal-service"

interface SparkUser {
  id: string
  name: string
  username: string
  avatarUrl: string
  eventsInCommon: number
  bio?: string
  location?: string
  interests?: string[]
  stats?: {
    events: number
    friends: number
    sparks: number
  }
}

@Component({
  selector: "app-sparks-modal",
  templateUrl: "./sparks-modal.html",
  styleUrls: ["./sparks-modal.scss"],
  standalone: false,
})
export class SparksModalComponent implements OnInit {
  @Input() sparksReceived: SparkUser[] = []
  @Input() sparksGiven: SparkUser[] = []
  @Input() initialTab: "received" | "given" = "received"

  activeTab: "received" | "given" = "received"

  constructor(
    private modalController: ModalController,
    private userProfileModalService: UserProfileModalService,
  ) {}

  ngOnInit() {
    this.activeTab = this.initialTab
    console.log("[v0] Sparks modal initialized with tab:", this.activeTab)
    console.log("[v0] Sparks received:", this.sparksReceived.length)
    console.log("[v0] Sparks given:", this.sparksGiven.length)
  }

  get currentList(): SparkUser[] {
    return this.activeTab === "received" ? this.sparksReceived : this.sparksGiven
  }

  get sectionTitle(): string {
    return this.activeTab === "received"
      ? "Persone che hanno lasciato uno spark"
      : "Persone a cui hai lasciato uno spark"
  }

  dismiss() {
    this.modalController.dismiss()
  }

  openUserProfile(user: SparkUser) {
    this.userProfileModalService.openUserProfile({
      name: user.name,
      username: user.username,
      avatarUrl: user.avatarUrl,
    })
  }

  openChat(user: SparkUser, event: Event) {
    event.stopPropagation()
    console.log("[v0] Opening chat with:", user.name)
    // TODO: Implement chat functionality
  }

  sparkBack(user: SparkUser, event: Event) {
    event.stopPropagation()
    console.log("[v0] Sparking back:", user.name)
    // TODO: Implement spark back functionality
  }
}
