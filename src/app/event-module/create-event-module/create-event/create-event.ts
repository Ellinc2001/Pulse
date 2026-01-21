import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

export interface EventCategory {
  id: string;
  name: string;
  icon: string;
  selected?: boolean;
}

export interface LiveStat {
  id: string;
  name: string;
  enabled: boolean;
}

export interface StatCategory {
  id: string;
  name: string;
  stats: LiveStat[];
  expanded?: boolean;
}


@Component({
  selector: "app-create-event",
  templateUrl: "./create-event.html",
  styleUrls: ["./create-event.scss"],
  standalone: false,
})
export class CreateEventComponent implements OnInit {

  public constructor(private router: Router){

  }
  ngOnInit(): void {
  }

}
