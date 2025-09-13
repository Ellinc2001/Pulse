import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface MenuTab {
  id: string
  label: string
  icon: string
}

@Component({
  selector: 'app-menu-list',
  standalone: false,
  templateUrl: './menu-list.html',
  styleUrl: './menu-list.scss'
})
export class MenuListComponent {

  @Input() activeTab = "stats"
  @Output() tabChange = new EventEmitter<string>()

  menuTabs: MenuTab[] = [
    {
      id: "stats",
      label: "Real-time Stats",
      icon: "analytics-outline",
    },
    {
      id: "videos",
      label: "Live Videos",
      icon: "videocam-outline",
    },
    {
      id: "chat",
      label: "General Chat",
      icon: "chatbubbles-outline",
    },
  ]

  constructor() {}

  onTabClick(tabId: string) {
    if (this.activeTab !== tabId) {
      this.activeTab = tabId
      this.tabChange.emit(tabId)
    }
  }

  isActive(tabId: string): boolean {
    return this.activeTab === tabId
  }

}
