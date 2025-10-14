import { Component, Input } from "@angular/core"

export interface WaitTimeData {
  queueName: string
  waitTime: string
  color: "green" | "amber" | "red"
  icon?: string
}

@Component({
  selector: "app-wait-time-pills",
  templateUrl: "./wait-time-pills.html",
  styleUrls: ["./wait-time-pills.scss"],
  standalone: false
})
export class WaitTimePillsComponent {
  @Input() waitTime!: WaitTimeData
  @Input() title?: string

  constructor() {
    console.log("[v0] WaitTimePillsComponent initialized")
  }

  ngOnInit() {
    console.log("[v0] WaitTimePillsComponent waitTime:", this.waitTime)
  }
}
