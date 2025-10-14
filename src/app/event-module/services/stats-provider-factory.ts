// services/stats-provider-factory.ts
import { Injectable } from '@angular/core';
import { EventType } from '../stat-visual-map';
import { StatsProvider } from './stats-provider';
import { ClubService } from './club-service';

@Injectable({ providedIn: 'root' })
export class StatsProviderFactory {
  constructor(private club: ClubService) {}

  /** Sostituisci lo switch quando avrai altri servizi */
  getProvider(eventType: EventType): StatsProvider {
    // es: if (eventType === 'festival') return this.festivalService;
    return this.club;
  }
}
