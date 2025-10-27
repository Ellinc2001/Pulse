// real-time-stats-notify.component.ts
import { Component, OnInit } from "@angular/core";
import { ClubService } from "../services/club-service";

@Component({
  selector: "app-real-time-stats-notify",
  templateUrl: "./real-time-stats-notify.html",
  styleUrls: ["./real-time-stats-notify.scss"],
  standalone: false,
})
export class RealTimeStatsNotify implements OnInit {
  carousels: any[] = [];

  constructor(private clubService: ClubService) {}

  ngOnInit(): void {
    // UN carosello per tipologia (Chip, Slider, Rating, …), con tutte le slide dentro
    this.carousels = this.clubService.getInputCarouselsForClub();
  }

  back() {}
}
