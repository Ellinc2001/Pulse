import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-pulse',
  standalone: false,
  templateUrl: './my-pulse.html',
  styleUrls: ['./my-pulse.scss'],
})
export class MyPulseComponent {
  sparkTab: 'me' | 'mine' = 'me';

  constructor(private router: Router) {}

  navigateToPreferences() {
    this.router.navigate(['/my-vibes', 'preferences-config']);
  }

}
