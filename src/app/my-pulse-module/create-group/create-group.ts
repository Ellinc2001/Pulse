import { Component, type OnInit } from "@angular/core"
import { NavController } from "@ionic/angular"

interface VibeTag {
  id: string
  label: string
  icon: string
  selected: boolean
}

interface GroupEvent {
  id: string
  month: string
  day: number
  title: string
  venue: string
  time: string
  selected: boolean
}

interface PastVideo {
  id: string
  thumbnail: string
  type: "live" | "event"
}

@Component({
  selector: "app-create-group",
  templateUrl: "./create-group.html",
  styleUrls: ["./create-group.scss"],
  standalone: false
})
export class CreateGroupComponent implements OnInit {
  groupName = ""
  coverImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuAXwlb3Tw-KiIaL8i9gs_kkWtn8VdiVNAtXMoQe5PTNuUVtcwatAABT3X2pzES_rVNvXJjF23pjikFwOcQbF0vF_q1ND0ggyZId-k0jhqWpRhiW2qjdZpBt01eemYkryXzJAkyXRnyLIIRTBvdPoL-B7FejtCVCbZSZpg9f9GqVuM86sUwBu9WJCeebEhhg_XBwN1F7tn8ZcU0-yluj7v0HncWpIdy6IWhilEcgWeCEi-o8IvvMAqLV9P4kpmSiJNQ1QryyXCfk6TU"

  vibeTags: VibeTag[] = [
    { id: "nightlife", label: "Nightlife", icon: "moon-outline", selected: true },
    { id: "techno", label: "Techno", icon: "musical-notes-outline", selected: true },
    { id: "aperitivo", label: "Aperitivo", icon: "wine-outline", selected: false },
    { id: "festivals", label: "Festivals", icon: "bonfire-outline", selected: false },
    { id: "studio", label: "Studio", icon: "book-outline", selected: false },
    { id: "bday", label: "Bday Party", icon: "gift-outline", selected: false },
  ]

  pastVideos: PastVideo[] = [
    {
      id: "1",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqxhhriDx7a9S6L-oi78voJzZuyoYn-KN8GVCrrd_uhZb1phqMijNq6psT7O0g3WwdlnAIjf5KPQ2vAziHH3LqPM1HTh9dmtA8TrUeXv3XRy5LEYThF_ujHcVm_pgtv0GtBaq5wBBuAAL7WQghS3nv6OKct3LOwyB0bPP98eVRs9hwTSA2HVdJ98old0C9X0E46Od6GEmg3Q5EcweSYmzC63asfjNHfv-6Xx1Lk9zya37AgJLAiW6WRNf5nanUlFWzwxaqZF3Qmqw",
      type: "live",
    },
    {
      id: "2",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuASNLkaCOzxeCcN49zPOXJQfT84zXCt5r6-m2RkqGDA083kLzbFuWbevP_oTDXvjmH_wDHm2YhX2BOYigHLwURvqERJBsfoFIwFABgGzl8ocPXU9a7z0FOTv8KR5pagZ0havSyHCRotIHZzTZb8KhQVwKniD1M2IuA3Mj8_CdnkpEZLZTJxgCRmsefnU34M3jhfb0f7uLmivLJ9bj5MPFbMCcjfbvfs07Kg2vNSv84U-bouFivHIywxjOSAYXKZ8u41ZLZuLXzYZtM",
      type: "event",
    },
  ]

  groupEvents: GroupEvent[] = [
    {
      id: "1",
      month: "GIU",
      day: 24,
      title: "Neon Paradise",
      venue: "Galaxy Club",
      time: "23:00",
      selected: true,
    },
    {
      id: "2",
      month: "LUG",
      day: 2,
      title: "Aperitivo Rooftop",
      venue: "Skyline Bar",
      time: "19:30",
      selected: false,
    },
  ]

  constructor(private navController: NavController) {}

  ngOnInit() {}

  goBack() {
    this.navController.back()
  }

  get selectedVibesCount(): number {
    return this.vibeTags.filter((v) => v.selected).length
  }

  toggleVibe(vibe: VibeTag) {
    if (vibe.selected) {
      vibe.selected = false
    } else if (this.selectedVibesCount < 5) {
      vibe.selected = true
    }
  }

  toggleEvent(event: GroupEvent) {
    event.selected = !event.selected
  }

  changeCoverImage() {
    // TODO: implement image picker
  }

  addVideo() {
    // TODO: implement video picker
  }

  createGroup() {
    // TODO: implement group creation
    console.log("Creating group:", {
      name: this.groupName,
      vibes: this.vibeTags.filter((v) => v.selected),
      events: this.groupEvents.filter((e) => e.selected),
    })
  }

  saveAsDraft() {
    // TODO: implement draft saving
    console.log("Saving as draft")
  }
}
