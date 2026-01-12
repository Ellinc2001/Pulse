import { Injectable } from "@angular/core"
import { ModalController } from "@ionic/angular"
import { UserSearchModalComponent } from "../user-profile-modal/user-search-modal/user-search-modal

@Injectable({
  providedIn: "root",
})
export class UserSearchModalService {
  constructor(private modalController: ModalController) {}

  async openSearchModal() {
    const presentingElement =
      document.querySelector("ion-router-outlet") || document.querySelector("ion-nav") || document.body

    const modal = await this.modalController.create({
      component: UserSearchModalComponent,
      cssClass: "user-search-modal-wrapper",
      presentingElement: presentingElement as HTMLElement,
      showBackdrop: true,
      backdropDismiss: true,
    })

    const ionApp = document.querySelector("ion-app")
    const ionRouterOutlet = document.querySelector("ion-router-outlet")
    const ionContent = document.querySelectorAll("ion-content")

    if (ionApp) ionApp.classList.add("modal-blur-active")
    if (ionRouterOutlet) ionRouterOutlet.classList.add("modal-blur-active")
    ionContent.forEach((content) => content.classList.add("modal-blur-active"))

    modal.onDidDismiss().then(() => {
      if (ionApp) ionApp.classList.remove("modal-blur-active")
      if (ionRouterOutlet) ionRouterOutlet.classList.remove("modal-blur-active")
      ionContent.forEach((content) => content.classList.remove("modal-blur-active"))
    })

    await modal.present()
    return modal
  }
}
