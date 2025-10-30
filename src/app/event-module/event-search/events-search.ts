import { Component, type OnInit, type AfterViewInit, ViewChild, type ElementRef } from "@angular/core"
import * as L from "leaflet"
import type { EventData } from "../event-card/event-card.ts"
import { Router } from "@angular/router"
import { UserProfileData } from "src/app/user-profile-modal/user-profile-modal"
import { UserProfileModalService } from "src/app/services/user-profile-modal-service"

interface UserData {
  id: string
  name: string
  username: string
  imageUrl: string
  coordinates: [number, number]
  distance: number
  commonInterests?: number
  color: string
}

interface GroupData {
  id: string
  name: string
  imageUrl: string
  coordinates: [number, number]
  members: Array<{ id: string; imageUrl: string }>
  totalMembers: number
  color: string
}

@Component({
  selector: "app-events-search",
  standalone: false,
  templateUrl: "./events-search.html",
  styleUrls: ["./events-search.scss"],
})
export class EventsSearchComponent implements OnInit, AfterViewInit {
  @ViewChild("mapContainer", { static: false }) mapContainer!: ElementRef

  private map!: L.Map
  private markers: L.Marker[] = []

  selectedSegment = "events"

  private allUsers: Map<string, UserProfileData> = new Map([
    // Main users
    [
      "u1",
      {
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        name: "Sofia Bianchi",
        username: "@sofiabianchi",
        socialLinks: {
          instagram: "https://instagram.com/sofiabianchi",
          tiktok: "https://tiktok.com/@sofiabianchi",
        },
      },
    ],
    [
      "u2",
      {
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        name: "Luca Moretti",
        username: "@lucamoretti",
        socialLinks: {
          instagram: "https://instagram.com/lucamoretti",
          facebook: "https://facebook.com/lucamoretti",
        },
      },
    ],
    [
      "u3",
      {
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
        name: "Giulia Conti",
        username: "@giuliaconti",
        socialLinks: {
          instagram: "https://instagram.com/giuliaconti",
          tinder: "https://tinder.com",
        },
      },
    ],
    // Group members
    [
      "m1",
      {
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        name: "Anna Rossi",
        username: "@annarossi",
        socialLinks: {
          instagram: "https://instagram.com/annarossi",
        },
      },
    ],
    [
      "m2",
      {
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        name: "Marco Verdi",
        username: "@marcoverdi",
        socialLinks: {
          facebook: "https://facebook.com/marcoverdi",
        },
      },
    ],
    [
      "m3",
      {
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        name: "Laura Bianchi",
        username: "@laurabianchi",
        socialLinks: {
          tiktok: "https://tiktok.com/@laurabianchi",
        },
      },
    ],
    [
      "m4",
      {
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
        name: "Paolo Neri",
        username: "@paoloneri",
        socialLinks: {
          instagram: "https://instagram.com/paoloneri",
        },
      },
    ],
    [
      "m5",
      {
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
        name: "Chiara Russo",
        username: "@chiararusso",
        socialLinks: {
          tinder: "https://tinder.com",
        },
      },
    ],
    [
      "m6",
      {
        avatarUrl: "https://images.unsplash.com/photo-1544005313940-b1c1722653e1?w=100&q=80",
        name: "Davide Marino",
        username: "@davidemarino",
        socialLinks: {
          instagram: "https://instagram.com/davidemarino",
        },
      },
    ],
    [
      "m7",
      {
        avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
        name: "Francesca Gallo",
        username: "@francescagallo",
        socialLinks: {
          facebook: "https://facebook.com/francescagallo",
        },
      },
    ],
    [
      "m8",
      {
        avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
        name: "Simone Costa",
        username: "@simonecosta",
        socialLinks: {
          tiktok: "https://tiktok.com/@simonecosta",
        },
      },
    ],
    [
      "m9",
      {
        avatarUrl: "https://images.unsplash.com/photo-1517841905240-b1c34a7d66df?w=100&q=80",
        name: "Valentina Ricci",
        username: "@valentinaricci",
        socialLinks: {
          instagram: "https://instagram.com/valentinaricci",
        },
      },
    ],
    [
      "m10",
      {
        avatarUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&q=80",
        name: "Andrea Fontana",
        username: "@andreafontana",
        socialLinks: {
          facebook: "https://facebook.com/andreafontana",
        },
      },
    ],
    [
      "m11",
      {
        avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80",
        name: "Martina Serra",
        username: "@martinaserra",
        socialLinks: {
          tinder: "https://tinder.com",
        },
      },
    ],
    [
      "m12",
      {
        avatarUrl: "https://images.unsplash.com/photo-1488426862026-ee32379fefbe?w=100&q=80",
        name: "Alessio Greco",
        username: "@alessiogreco",
        socialLinks: {
          instagram: "https://instagram.com/alessiogreco",
        },
      },
    ],
    [
      "m13",
      {
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
        name: "Elisa Romano",
        username: "@elisaromano",
        socialLinks: {
          tiktok: "https://tiktok.com/@elisaromano",
        },
      },
    ],
    [
      "m14",
      {
        avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80",
        name: "Matteo Colombo",
        username: "@matteocolombo",
        socialLinks: {
          facebook: "https://facebook.com/matteocolombo",
        },
      },
    ],
    [
      "m15",
      {
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        name: "Federica Esposito",
        username: "@federicaesposito",
        socialLinks: {
          instagram: "https://instagram.com/federicaesposito",
        },
      },
    ],
    [
      "m16",
      {
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
        name: "Riccardo Mancini",
        username: "@riccardomancini",
        socialLinks: {
          tinder: "https://tinder.com",
        },
      },
    ],
    [
      "m17",
      {
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        name: "Silvia Barbieri",
        username: "@silviabarbieri",
        socialLinks: {
          tiktok: "https://tiktok.com/@silviabarbieri",
        },
      },
    ],
    [
      "m18",
      {
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        name: "Gabriele Santoro",
        username: "@gabrielesantoro",
        socialLinks: {
          instagram: "https://instagram.com/gabrielesantoro",
        },
      },
    ],
  ])

  events: EventData[] = [
    {
      id: "1",
      title: "Indie Rock Night",
      category: "Music",
      location: "The Fillmore",
      distance: 1.2,
      imageUrl: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=1200&q=80",
      coordinates: [37.7849, -122.4094],
      color: "#4dffcb",
      description: "Musica e indie e sesso live",
      attendees: ["boh"],
      time: "19:20",
      date: new Date(),
    },
    {
      id: "2",
      title: "Stand-Up Showcase",
      category: "Comedy",
      location: "Punch Line",
      distance: 2.5,
      imageUrl: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1200&q=80",
      coordinates: [37.7849, -122.4194],
      color: "#ff4da6",
      description: "Stand up e sesso live",
      attendees: ["boh"],
      time: "13:30",
      date: new Date(),
    },
    {
      id: "3",
      title: "Modern Art Exhibition",
      category: "Art",
      location: "SFMOMA",
      distance: 0.8,
      imageUrl: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=1200&q=80",
      coordinates: [37.7749, -122.4094],
      color: "#4da6ff",
      description: "Modern art e sesso live",
      attendees: ["boh"],
      time: "18:00",
      date: new Date(),
    },
  ]

  users: UserData[] = [
    {
      id: "u1",
      name: "Sofia Bianchi",
      username: "@sofiabianchi",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      coordinates: [37.7849, -122.4094],
      distance: 2.0,
      commonInterests: 3,
      color: "#4dffcb", // Added green color
    },
    {
      id: "u2",
      name: "Luca Moretti",
      username: "@lucamoretti",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      coordinates: [37.7749, -122.4194],
      distance: 5.0,
      color: "#ff4da6", // Added pink color
    },
    {
      id: "u3",
      name: "Giulia Conti",
      username: "@giuliaconti",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      coordinates: [37.7649, -122.4294],
      distance: 8.0,
      commonInterests: 1,
      color: "#4da6ff", // Added blue color
    },
  ]

  groups: GroupData[] = [
    {
      id: "g1",
      name: "Indie Rock Lovers",
      imageUrl: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&q=80",
      coordinates: [37.7949, -122.4094],
      members: [
        { id: "m1", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
        { id: "m2", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
        { id: "m3", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
      ],
      totalMembers: 24,
      color: "#4dffcb", // Added green color
    },
    {
      id: "g2",
      name: "SF Night Owls",
      imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
      coordinates: [37.7849, -122.4294],
      members: [
        { id: "m4", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" },
        { id: "m5", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" },
      ],
      totalMembers: 12,
      color: "#ff4da6", // Added pink color
    },
    {
      id: "g3",
      name: "Electronic Music Fans",
      imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80",
      coordinates: [37.7649, -122.4094],
      members: [
        { id: "m6", imageUrl: "https://images.unsplash.com/photo-1544005313940-b1c1722653e1?w=100&q=80" },
        { id: "m7", imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" },
        { id: "m8", imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80" },
        { id: "m9", imageUrl: "https://images.unsplash.com/photo-1517841905240-b1c34a7d66df?w=100&q=80" },
      ],
      totalMembers: 45,
      color: "#4da6ff", // Added blue color
    },
    {
      id: "g4",
      name: "Comedy Club Regulars",
      imageUrl: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&q=80",
      coordinates: [37.7549, -122.4194],
      members: [
        { id: "m10", imageUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&q=80" },
        { id: "m11", imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80" },
      ],
      totalMembers: 18,
      color: "#4dffcb", // Added green color
    },
    {
      id: "g5",
      name: "Art Gallery Enthusiasts",
      imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80",
      coordinates: [37.7749, -122.4394],
      members: [
        { id: "m12", imageUrl: "https://images.unsplash.com/photo-1488426862026-ee32379fefbe?w=100&q=80" },
        { id: "m13", imageUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&q=80" },
        { id: "m14", imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80" },
      ],
      totalMembers: 32,
      color: "#ff4da6", // Added pink color
    },
    {
      id: "g6",
      name: "Weekend Warriors",
      imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80",
      coordinates: [37.7849, -122.4494],
      members: [
        { id: "m15", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
        { id: "m16", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" },
        { id: "m17", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
        { id: "m18", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
      ],
      totalMembers: 56,
      color: "#4da6ff", // Added blue color
    },
  ]

  constructor(
    private router: Router,
    private userProfileModalService: UserProfileModalService,
  ) {}

  ngOnInit() {
    console.log("Sono qui")
  }

  ngAfterViewInit() {
    this.initializeMap()
  }

  private initializeMap() {
    // Initialize map with dark theme
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [37.7749, -122.4194],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    })

    // Add dark tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "",
    }).addTo(this.map)

    // Add custom zoom control
    L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(this.map)

    // Add markers for events
    this.addEventMarkers()
  }

  private addEventMarkers() {
    this.events.forEach((event) => {
      // Create custom marker icon with event color
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: 16px;
            height: 16px;
            background-color: ${event.color};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(${this.getRgbFromHex(event.color)}, 0.6);
          "></div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      const marker = L.marker(event.coordinates, { icon: customIcon })
        .addTo(this.map)
        .on("click", () => this.scrollToEvent(event.id))

      this.markers.push(marker)
    })
  }

  private addUserMarkers() {
    this.users.forEach((user) => {
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background-image: url('${user.imageUrl}');
            background-size: cover;
            background-position: center;
            border: 3px solid ${user.color};
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(${this.getRgbFromHex(user.color)}, 0.6);
          "></div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      const marker = L.marker(user.coordinates, { icon: customIcon })
        .addTo(this.map)
        .on("click", () => this.scrollToUser(user.id))

      this.markers.push(marker)
    })
  }

  private addGroupMarkers() {
    this.groups.forEach((group) => {
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: 36px;
            height: 36px;
            background-image: url('${group.imageUrl}');
            background-size: cover;
            background-position: center;
            border: 3px solid ${group.color};
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(${this.getRgbFromHex(group.color)}, 0.6);
          "></div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      })

      const marker = L.marker(group.coordinates, { icon: customIcon })
        .addTo(this.map)
        .on("click", () => this.scrollToGroup(group.id))

      this.markers.push(marker)
    })
  }

  private updateMarkers() {
    // Clear existing markers
    this.markers.forEach((marker) => marker.remove())
    this.markers = []

    // Add new markers based on selected segment
    if (this.selectedSegment === "events") {
      this.addEventMarkers()
    } else {
      this.addUserMarkers()
      this.addGroupMarkers()
    }
  }

  public getRgbFromHex(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
      const r = Number.parseInt(result[1], 16)
      const g = Number.parseInt(result[2], 16)
      const b = Number.parseInt(result[3], 16)
      return `${r}, ${g}, ${b}`
    }
    return "77, 255, 203"
  }

  private scrollToEvent(eventId: string) {
    const element = document.getElementById(`event-${eventId}`)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })

      element.style.transform = "scale(1.02)"
      element.style.transition = "transform 0.3s ease"

      setTimeout(() => {
        element.style.transform = "scale(1)"
      }, 300)
    }
  }

  private scrollToUser(userId: string) {
    const element = document.getElementById(`user-${userId}`)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })

      element.style.transform = "scale(1.02)"
      element.style.transition = "transform 0.3s ease"

      setTimeout(() => {
        element.style.transform = "scale(1)"
      }, 300)
    }
  }

  private scrollToGroup(groupId: string) {
    const element = document.getElementById(`group-${groupId}`)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })

      element.style.transform = "scale(1.02)"
      element.style.transition = "transform 0.3s ease"

      setTimeout(() => {
        element.style.transform = "scale(1)"
      }, 300)
    }
  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value
    console.log("Segment changed to:", this.selectedSegment)
    this.updateMarkers()
  }

  openUserProfile(userId: string) {
    console.log("[v0] Opening user profile for:", userId)

    const userData = this.allUsers.get(userId)

    if (!userData) {
      console.error("[v0] User not found:", userId)
      return
    }

    console.log("[v0] Found user data:", userData)
    this.userProfileModalService.openUserProfile(userData)
  }

  openFilters() {
    this.router.navigate(["/format-choice"])
  }

  openFullMap() {
    console.log("Opening full map view")
  }

  goBack() {
    console.log("Going back")
  }

  navigateToEventDetail(event: EventData): void {
    console.log("Event: ", event)
    this.router.navigate(["event/detail"], { state: { event } })
  }
}
