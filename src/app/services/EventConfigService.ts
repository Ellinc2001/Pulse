import { Injectable } from '@angular/core';

export interface EventStatConfig {
  eventId: string;
  statId: string;
  params?: Record<string, any>;
  order?: number;
  isRequired?: boolean;
  windowSec?: number;
}

export interface EventMeta {
  id: string;
  name: string;
  type: string; // es. "club", "conference"...
}

@Injectable({ providedIn: 'root' })
export class EventConfigService implements EventConfigService {
  async getEventMeta(eventId: string): Promise<EventMeta> {
    return { id: eventId, name: 'Evento demo', type: 'club' };
  }

  async getEventStatConfigs(eventId: string): Promise<EventStatConfig[]> {
    return [];
  }

  async saveEventStatConfigs(eventId: string, cfgs: EventStatConfig[]): Promise<void> {
    console.log('Saving configs', eventId, cfgs);
  }

  async savePresetFromCurrent(eventId: string, name: string): Promise<void> {
    console.log('Saving preset', eventId, name);
  }
}
