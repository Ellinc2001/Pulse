import { Component, Input, Output, EventEmitter } from "@angular/core"

export interface InviteData {
  id: string
  eventTitle: string
  fromUser: string
  avatarUrl?: string
  avatarText?: string
}

@Component({
  selector: "app-invite-card",
  standalone: false,
  templateUrl: "./invite-card.html",
  styleUrls: ["./invite-card.scss"],
})
export class InviteCard {
  @Input() invite!: InviteData
  @Output() accept = new EventEmitter<string>()
  @Output() decline = new EventEmitter<string>()

  isAnimating = false

  onAccept() {
    if (this.isAnimating) return
    this.isAnimating = true
    this.accept.emit(this.invite.id)
  }

  onDecline() {
    if (this.isAnimating) return
    this.isAnimating = true
    this.decline.emit(this.invite.id)
  }
}
