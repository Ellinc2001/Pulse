import { Injectable } from "@angular/core"
import { ModalController } from "@ionic/angular"
import { UserProfileData, UserProfileModalComponent } from "../modals/user-profile-modal/user-profile-modal"

@Injectable({
  providedIn: "root",
})
export class UserProfileModalService {
  constructor(private modalController: ModalController) {}

  async openUserProfile(userData: UserProfileData): Promise<any> {
    const ionApp = document.querySelector("ion-app")
    const ionRouterOutlet = document.querySelector("ion-router-outlet")
    const ionContent = document.querySelector("ion-content")

    console.log("[v0] Opening modal, applying blur to:", { ionApp, ionRouterOutlet, ionContent })

    if (ionApp) ionApp.classList.add("modal-blur-active")
    if (ionRouterOutlet) ionRouterOutlet.classList.add("modal-blur-active")
    if (ionContent) ionContent.classList.add("modal-blur-active")

    const modal = await this.modalController.create({
      component: UserProfileModalComponent,
      componentProps: {
        userData,
      },
      cssClass: "user-profile-modal-wrapper",
      backdropDismiss: true,
      showBackdrop: true,
    })

    modal.onDidDismiss().then(() => {
      console.log("[v0] Modal dismissed, removing blur classes")
      if (ionApp) ionApp.classList.remove("modal-blur-active")
      if (ionRouterOutlet) ionRouterOutlet.classList.remove("modal-blur-active")
      if (ionContent) ionContent.classList.remove("modal-blur-active")
    })

    await modal.present()

    const { data } = await modal.onWillDismiss()

    return data
  }
}
