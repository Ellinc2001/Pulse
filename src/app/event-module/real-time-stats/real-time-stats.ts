import { Component, type OnInit } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router"
import { ClubService } from "../services/club-service"
import { Participant } from "../participants-avatars/participants-avatars"

@Component({
  selector: "app-real-time-stats",
  templateUrl: "./real-time-stats.html",
  styleUrls: ["./real-time-stats.scss"],
  standalone: false,
})
export class RealTimeStatsComponent implements OnInit {
  carousels: any[] = []

  participants: Participant[] = [
    {
      id: "1",
      name: "Marco Rossi",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      badge: "VIP",
    },
    {
      id: "2",
      name: "Laura Bianchi",
      avatarUrl: "https://i.pravatar.cc/150?img=45",
      badge: "Host",
    },
    {
      id: "3",
      name: "Giovanni Verdi",
      avatarUrl: "https://i.pravatar.cc/150?img=33",
    },
    {
      id: "4",
      name: "Sofia Neri",
      avatarUrl: "https://i.pravatar.cc/150?img=47",
    },
  ]

  totalParticipants = 1200

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clubService: ClubService,
  ) {}

  ngOnInit(): void {
    this.carousels = this.clubService.getCarouselsForClub()
  }

  back() {}
}
