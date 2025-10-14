import { Component, type OnInit, type Type } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ClubService } from "../services/club-service";

@Component({
  selector: "app-real-time-stats",
  templateUrl: "./real-time-stats.html",
  styleUrls: ["./real-time-stats.scss"],
  standalone: false,
})
export class RealTimeStatsComponent implements OnInit {

  carousels: any[] = []

  constructor(private router: Router, private route: ActivatedRoute, private clubService: ClubService) {}

  ngOnInit(): void {
    this.carousels = this.clubService.getCarouselsForClub()
  }

  back() {
    
  }


}
