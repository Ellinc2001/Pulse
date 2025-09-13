import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private router: Router) {}

  activeTab: "home" | "search" | "profile" = "home"

  setActiveTab(tab: "home" | "search" | "profile") {
    console.log('Searxh')
    this.activeTab = tab;

    if (tab === "search") {
      this.router.navigate(['/events-search']); // o il path corretto
    }
  }
}
