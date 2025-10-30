import { Component, type OnInit } from "@angular/core"
import { ModalController } from "@ionic/angular"

export interface RecentSearch {
  id: string
  name: string
  username: string
  avatarUrl: string
}

export interface SuggestedUser {
  id: string
  name: string
  username: string
  avatarUrl: string
  distance?: string
  commonInterests?: number
}

@Component({
  selector: "app-user-search-modal",
  templateUrl: "./user-search-modal.html",
  styleUrls: ["./user-search-modal.scss"],
  standalone: false
})
export class UserSearchModalComponent implements OnInit {
  searchQuery = ""
  activeFilter = "nearby"

  filters = [
    { id: "nearby", label: "Vicino a me" },
    { id: "friends", label: "Amici di amici" },
    { id: "dj", label: "DJ" },
    { id: "staff", label: "Staff" },
  ]

  recentSearches: RecentSearch[] = [
    {
      id: "1",
      name: "Anna Rossi",
      username: "@annarossi",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      name: "Marco Verdi",
      username: "@marcoverdi",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
  ]

  suggestedUsers: SuggestedUser[] = [
    {
      id: "3",
      name: "Sofia Bianchi",
      username: "@sofiabianchi",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      distance: "2km",
      commonInterests: 3,
    },
    {
      id: "4",
      name: "Luca Moretti",
      username: "@lucamoretti",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
      distance: "5km",
    },
    {
      id: "5",
      name: "Giulia Conti",
      username: "@giuliaconti",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      distance: "8km",
      commonInterests: 1,
    },
  ]

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss()
  }

  selectFilter(filterId: string) {
    this.activeFilter = filterId
  }

  removeRecentSearch(searchId: string) {
    this.recentSearches = this.recentSearches.filter((s) => s.id !== searchId)
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value
    // Implement search logic here
  }

  sparkUser(userId: string) {
    console.log("[v0] Spark user:", userId)
    // Implement spark logic here
  }

  messageUser(userId: string) {
    console.log("[v0] Message user:", userId)
    // Implement message logic here
  }

  openAdvancedFilters() {
    console.log("[v0] Open advanced filters")
    // Implement advanced filters logic here
  }
}
