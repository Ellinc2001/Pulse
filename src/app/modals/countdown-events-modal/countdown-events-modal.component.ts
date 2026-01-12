import { Component, Input } from "@angular/core"
import { ModalController } from "@ionic/angular"
import { Router } from "@angular/router"

interface CountdownEvent {
  id: string
  name: string
  venue: string
  icon: string
  countdown: string
  isUrgent?: boolean
}

@Component({
  selector: "app-countdown-events-modal",
  templateUrl: "./countdown-events-modal.component.html",
  styleUrls: ["./countdown-events-modal.component.scss"],
  standalone: false,
})
export class CountdownEventsModalComponent {
  @Input() events: CountdownEvent[] = []

  currentPage = 1
  itemsPerPage = 6

  constructor(
    private modalController: ModalController,
    private router: Router,
  ) {
    console.log("[v0] CountdownEventsModal initialized with events:", this.events.length)
  }

  get totalPages(): number {
    return Math.ceil(this.events.length / this.itemsPerPage)
  }

  get paginatedEvents(): CountdownEvent[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    return this.events.slice(startIndex, startIndex + this.itemsPerPage)
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
    console.log("[v0] CountdownEventsModal dismissed")
    this.modalController.dismiss()
  }

  async openEventDetail(eventId: string) {
    console.log("[v0] Opening event detail:", eventId)
    await this.modalController.dismiss()
    this.router.navigate(["/event-detail", eventId])
  }
}
