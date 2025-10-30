import { Component, Input } from "@angular/core"

export interface Participant {
  id: string
  name: string
  avatarUrl: string
  badge?: "VIP" | "Host"
}

@Component({
  selector: "app-participants-avatars",
  templateUrl: "./participants-avatars.html",
  styleUrls: ["./participants-avatars.scss"],
  standalone: false,
})
export class ParticipantsAvatarsComponent {
  @Input() participants: Participant[] = []
  @Input() totalCount = 0
  @Input() title = "Partecipanti"

  get visibleParticipants(): Participant[] {
    return this.participants
  }

  get remainingCount(): number {
    return this.totalCount - this.visibleParticipants.length
  }

  getBadgeClass(badge?: "VIP" | "Host"): string {
    if (badge === "VIP") return "badge-vip"
    if (badge === "Host") return "badge-host"
    return ""
  }
}
