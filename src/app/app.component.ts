import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BadgeService, BadgeData } from "src/app/services/badge-service"
import { XpAnimationService } from './services/xp-lightning.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})

export class AppComponent {
  constructor(private router: Router, private badgeService: BadgeService, private xpAnimationService: XpAnimationService
) {}

  badgeData: BadgeData = {
    isVisible: false,
    eventData: null,
    position: { x: 20, y: 100 },
  }

  private badgeSubscription?: Subscription
  activeTab: "home" | "search" | "profile" = "home"

  ngOnInit() {
    this.badgeSubscription = this.badgeService.badge$.subscribe((badgeData: BadgeData) => {
      this.badgeData = badgeData
      console.log("[v0] Badge state updated:", badgeData)
    })
  }

  setActiveTab(tab: "home" | "search" | "profile") {
    console.log('Searxh')
    this.activeTab = tab;

    if (tab === "search") {
      this.router.navigate(['/events-search']); // o il path corretto
    }
  }

  ngOnDestroy() {
    if (this.badgeSubscription) {
      this.badgeSubscription.unsubscribe()
    }
  }

  onBadgePositionChange(position: { x: number; y: number }) {
    this.badgeService.updateBadgePosition(position)
  }
}
