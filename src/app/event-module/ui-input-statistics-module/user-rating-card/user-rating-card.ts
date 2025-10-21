import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-rating-card',
  templateUrl: './user-rating-card.html',
  styleUrls: ['./user-rating-card.scss'],
  standalone: false
})
export class UserRatingCardComponent {
  @Input() userName: string = 'Utente';
  @Input() userAvatar: string = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400';

  @Output() vibeRatingClick = new EventEmitter<void>();
  @Output() fairPlayRatingClick = new EventEmitter<void>();

  onVibeClick(): void {
    this.vibeRatingClick.emit();
  }

  onFairPlayClick(): void {
    this.fairPlayRatingClick.emit();
  }
}
