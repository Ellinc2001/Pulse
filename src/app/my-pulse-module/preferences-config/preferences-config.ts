import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface MusicGenre { name: string; active: boolean; weight: number; }

@Component({
  selector: 'app-preferences-config',
  templateUrl: './preferences-config.html',
  styleUrls: ['./preferences-config.scss'],
  standalone: false
})
export class PreferencesConfigComponent implements OnInit {
  // Generi
  musicGenres: MusicGenre[] = [
    { name: 'Techno',         active: true,  weight: 80 },
    { name: 'Deep House',     active: true,  weight: 65 },
    { name: 'Ambient',        active: false, weight: 30 },
    { name: 'Melodic Techno', active: false, weight: 45 },
  ];
  newGenreTag = '';

  // Sliders / scelte
  bpmRange = 124;
  energyLevel = 4;
  activeMood: 'Dark'|'Warm'|'Uplifting' = 'Warm';
  activeSetType: 'Live'|'DJ'|'Entrambi' = 'Entrambi';
  setDuration = 90;

  // Toggles musica
  vinylFriendly = false;
  avoidMainstream = true;
  discoverGems = true;

  // Venue
  activeVenueSize: 'Piccolo'|'Medio'|'Grande'|'Arena' = 'Medio';
  outdoorVenues = true;
  smokingArea = true;
  cloakroomRequired = false;
  barsNumber = 3;
  queueTime = 10;

  // Budget & time & comfort
  ticketPrice = 35;
  arrivalTime = '23:30';
  exitTime = '04:00';
  volumeLimit = 95;

  // Notifiche
  moodNotifications = true;
  autoBuyTickets = false;

  constructor(private router: Router) {}
  ngOnInit(): void {}

  goBack(): void {
    // Torna alla lista/tab principale (aggiorna se il path è diverso nel tuo app routing)
    this.router.navigate(['/my-vibes']);
  }

  addGenreTag(): void {
    const name = this.newGenreTag.trim();
    if (!name) return;
    this.musicGenres.push({ name, active: false, weight: 50 });
    this.newGenreTag = '';
  }

  toggleGenre(i: number): void {
    this.musicGenres[i].active = !this.musicGenres[i].active;
  }

  updateGenreWeight(i: number, value: number | string): void {
    this.musicGenres[i].weight = Number(value);
  }

  setMood(m: 'Dark'|'Warm'|'Uplifting') { this.activeMood = m; }
  setSetType(t: 'Live'|'DJ'|'Entrambi') { this.activeSetType = t; }
  setVenueSize(s: 'Piccolo'|'Medio'|'Grande'|'Arena') { this.activeVenueSize = s; }

  savePreferences(): void {
    // Qui potresti persistere su storage/API
    console.log('Saving preferences', {
      musicGenres: this.musicGenres,
      bpmRange: this.bpmRange,
      energyLevel: this.energyLevel,
      mood: this.activeMood,
      setType: this.activeSetType,
      setDuration: this.setDuration,
      vinylFriendly: this.vinylFriendly,
      avoidMainstream: this.avoidMainstream,
      discoverGems: this.discoverGems,
      venue: {
        size: this.activeVenueSize,
        outdoorVenues: this.outdoorVenues,
        smokingArea: this.smokingArea,
        cloakroomRequired: this.cloakroomRequired,
        barsNumber: this.barsNumber,
        queueTime: this.queueTime
      },
      ticketPrice: this.ticketPrice,
      arrivalTime: this.arrivalTime,
      exitTime: this.exitTime,
      avoidStrobes: this.avoidStrobes,
      volumeLimit: this.volumeLimit,
      moodNotifications: this.moodNotifications,
      autoBuyTickets: this.autoBuyTickets
    });
  }

  // proprietà mancanti segnalate dall'IDE
  avoidStrobes = false;
}
