import { Component } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "app-my-pulse",
  standalone: false,
  templateUrl: "./my-pulse.html",
  styleUrls: ["./my-pulse.scss"],
})
export class MyPulseComponent {
  sparkTab: "me" | "mine" = "me"

  constructor(private router: Router) {}

  navigateToPreferences() {
    this.router.navigate(["/my-vibes", "preferences-config"])
  }

  acceptInvite(inviteId: string) {
    const inviteElement = document.getElementById(inviteId)
    if (inviteElement) {
      inviteElement.classList.add("fade-out")
      // Remove element after animation completes
      setTimeout(() => {
        inviteElement.remove()
      }, 500)
    }
  }

  declineInvite(inviteId: string) {
    const inviteElement = document.getElementById(inviteId)
    if (inviteElement) {
      inviteElement.classList.add("fade-out")
      // Remove element after animation completes
      setTimeout(() => {
        inviteElement.remove()
      }, 500)
    }
  }
}
