import { Injectable } from '@angular/core';

export interface StatDefinition {
  id: string;
  label: string;
  description: string;
  dataType: StatDataType;
  source: StatSource;
  visualization: StatViz;
  tags: string[];
  requires?: string[];
  incompatibleWith?: string[];
  parameters?: StatParameterDef[];
  popularityScore?: number;
}

export interface Preset {
  id: string;
  eventType: string;
  label: string;
  tags: string[];
  recommended: PresetItem[];
}

export interface PresetItem {
  statId: string;
  defaultParams?: Record<string, any>;
  weight?: number;
  windowSec?: number;
}

export type StatDataType = 'number' | 'percent' | 'rating' | 'boolean' | 'enum';
export type StatSource =
  | 'user_feedback'
  | 'device_metric'
  | 'integration'
  | 'organizer_input'
  | 'derived';
export type StatViz =
  | 'gauge'
  | 'meter'
  | 'sparkline'
  | 'bar'
  | 'pie'
  | 'chip'
  | 'badge'
  | 'kpi';

export interface StatParameterDef {
  key: string;
  label: string;
  type: 'string' | 'number' | 'enum';
  enumChoices?: string[];
}

@Injectable({ providedIn: 'root' })
export class StatsRegistryService implements StatsRegistryService {
  async getStatDefinitions(): Promise<StatDefinition[]> {
    return [
      {
        id: 'drink_quality',
        label: 'Qualità drink',
        description: 'Valutazione media dei drink',
        dataType: 'rating',
        source: 'user_feedback',
        visualization: 'gauge',
        tags: ['food'],
      },
      {
        id: 'queue_time',
        label: 'Tempo in coda',
        description: 'Tempo medio di attesa in minuti',
        dataType: 'number',
        source: 'user_feedback',
        visualization: 'meter',
        tags: ['queue'],
      },
    ];
  }

  async getPresets(): Promise<Preset[]> {
    return [
      {
        id: 'club',
        eventType: 'club',
        label: 'Preset discoteca',
        tags: ['queue', 'food', 'audio'],
        recommended: [{ statId: 'drink_quality' }, { statId: 'queue_time' }],
      },
    ];
  }
}
