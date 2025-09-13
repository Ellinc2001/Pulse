import { Component, Input } from '@angular/core';

export interface StatCard {
  id: string
  title: string
  value: number | string
  change: number
  changeType: "increase" | "decrease" | "neutral"
  icon: string
  color: string
  suffix?: string
}

export interface ChartData {
  label: string
  value: number
  color: string
}

@Component({
  selector: 'app-real-time-stats',
  standalone: false,
  templateUrl: './real-time-stats.html',
  styleUrl: './real-time-stats.scss'
})
export class RealTimeStats {

  @Input() eventId?: string;

  private updateInterval: any
  public Math = Math;

  stats: StatCard[] = [
    {
      id: "attendees",
      title: "Live Attendees",
      value: 1247,
      change: 12.5,
      changeType: "increase",
      icon: "people",
      color: "var(--color-primary)",
    },
    {
      id: "engagement",
      title: "Engagement Rate",
      value: 87,
      change: 5.2,
      changeType: "increase",
      icon: "heart",
      color: "var(--color-chart-2)",
      suffix: "%",
    },
    {
      id: "messages",
      title: "Chat Messages",
      value: 3456,
      change: -2.1,
      changeType: "decrease",
      icon: "chatbubbles",
      color: "var(--color-accent)",
    },
    {
      id: "shares",
      title: "Social Shares",
      value: 892,
      change: 18.7,
      changeType: "increase",
      icon: "share-social",
      color: "var(--color-chart-1)",
    },
  ]

  demographicData: ChartData[] = [
    { label: "18-25", value: 35, color: "var(--color-primary)" },
    { label: "26-35", value: 28, color: "var(--color-secondary)" },
    { label: "36-45", value: 22, color: "var(--color-accent)" },
    { label: "46+", value: 15, color: "var(--color-chart-3)" },
  ]

  engagementTrend = [
    { time: "10:00", value: 45 },
    { time: "10:15", value: 52 },
    { time: "10:30", value: 67 },
    { time: "10:45", value: 73 },
    { time: "11:00", value: 87 },
  ]

  constructor() {}

  ngOnInit() {
    this.startRealTimeUpdates()
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
  }

  private startRealTimeUpdates() {
    // Simulate real-time updates every 5 seconds
    this.updateInterval = setInterval(() => {
      this.updateStats()
    }, 5000)
  }

  private updateStats() {
    // Simulate random stat updates
    this.stats = this.stats.map((stat) => ({
      ...stat,
      value: typeof stat.value === "number" ? stat.value + Math.floor(Math.random() * 10) - 5 : stat.value,
      change: (Math.random() - 0.5) * 20,
      changeType: Math.random() > 0.5 ? "increase" : "decrease",
    }))
  }

  getChangeIcon(changeType: string): string {
    switch (changeType) {
      case "increase":
        return "trending-up"
      case "decrease":
        return "trending-down"
      default:
        return "remove"
    }
  }

  getChangeColor(changeType: string): string {
    switch (changeType) {
      case "increase":
        return "#10b981" // green
      case "decrease":
        return "#ef4444" // red
      default:
        return "var(--color-muted-foreground)"
    }
  }

}
