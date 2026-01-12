import { Component, Input } from "@angular/core"
import { ModalController } from "@ionic/angular"

export interface UserProfileData {
  avatarUrl: string
  name: string
  username: string
  socialLinks?: {
    instagram?: string
    facebook?: string
    tinder?: string
    tiktok?: string
  }
}

@Component({
  selector: "app-user-profile-modal",
  templateUrl: "./user-profile-modal.html",
  styleUrls: ["./user-profile-modal.scss"],
  standalone: false
})
export class UserProfileModalComponent {
  @Input() userData!: UserProfileData

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss()
  }

  onSpark() {
    this.modalController.dismiss({
      action: "spark",
      userId: this.userData.username,
    })
  }

  onMessage() {
    this.modalController.dismiss({
      action: "message",
      userId: this.userData.username,
    })
  }

  openSocialLink(platform: string) {
    const link = this.userData.socialLinks?.[platform as keyof typeof this.userData.socialLinks]
    if (link) {
      window.open(link, "_blank")
    }
  }
}
