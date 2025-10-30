import { Component, type OnInit } from "@angular/core"
import { NavController } from "@ionic/angular"

interface ActiveFilter {
  id: string
  label: string
  type: string
}

@Component({
  selector: "app-filter-choice",
  templateUrl: "./filter-choice.html",
  styleUrls: ["./filter-choice.scss"],
  standalone: false
})
export class FilterChoiceComponent implements OnInit {
  selectedFormat = {
    icon: "nightlife",
    label: "Club/Disco",
  }

  activeFilters: ActiveFilter[] = [
    { id: "house", label: "House", type: "music" },
    { id: "18plus", label: "18+", type: "age" },
  ]

  // Music genres
  musicGenres = [
    { id: "house", label: "House", selected: true },
    { id: "techno", label: "Techno", selected: false },
    { id: "pop", label: "Pop", selected: false },
    { id: "hiphop", label: "Hip-hop", selected: false },
    { id: "commercial", label: "Commercial", selected: false },
  ]

  // Access
  ticketRequired = true

  // Dress code
  dressCode = "none" // 'none' or 'casual'

  // Capacity
  capacityValue = 0

  // Age
  ageFilter = "18plus" // 'all' or '18plus'

  // Crowd level
  crowdLevels = [
    { id: "low", label: "Basso", selected: false },
    { id: "medium", label: "Medio", selected: false },
    { id: "high", label: "Alto", selected: false },
  ]

  // Spaces
  spaceType = "indoor" // 'indoor' or 'outdoor'
  vipArea = false
  cloakroom = false

  // Food & Beverage
  foodMenu = true

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  close() {
    this.navCtrl.back()
  }

  clearAll() {
    // Reset all filters
    this.activeFilters = []
    this.musicGenres.forEach((genre) => (genre.selected = false))
    this.ticketRequired = false
    this.dressCode = "none"
    this.capacityValue = 0
    this.ageFilter = "all"
    this.crowdLevels.forEach((level) => (level.selected = false))
    this.spaceType = "indoor"
    this.vipArea = false
    this.cloakroom = false
    this.foodMenu = false
  }

  applyFilters() {
    console.log("[v0] Applying filters:", {
      music: this.musicGenres.filter((g) => g.selected),
      ticketRequired: this.ticketRequired,
      dressCode: this.dressCode,
      capacity: this.capacityValue,
      age: this.ageFilter,
      crowd: this.crowdLevels.filter((l) => l.selected),
      space: this.spaceType,
      vipArea: this.vipArea,
      cloakroom: this.cloakroom,
      foodMenu: this.foodMenu,
    })
    // Navigate back or emit event with filters
    this.navCtrl.back()
  }

  removeFilter(filter: ActiveFilter) {
    this.activeFilters = this.activeFilters.filter((f) => f.id !== filter.id)

    // Update corresponding filter state
    if (filter.type === "music") {
      const genre = this.musicGenres.find((g) => g.id === filter.id)
      if (genre) genre.selected = false
    } else if (filter.type === "age") {
      this.ageFilter = "all"
    }
  }

  toggleMusicGenre(genre: any) {
    genre.selected = !genre.selected

    if (genre.selected) {
      this.activeFilters.push({ id: genre.id, label: genre.label, type: "music" })
    } else {
      this.activeFilters = this.activeFilters.filter((f) => f.id !== genre.id)
    }
  }

  toggleCrowdLevel(level: any) {
    level.selected = !level.selected
  }

  showMoreMusic() {
    console.log("[v0] Show more music genres")
  }
}
