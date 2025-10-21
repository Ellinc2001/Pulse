import { InputComponentKey, UiComponentKey } from "./ui-reflection-map";

export type EventType = 'club';
export const ALL_EVENTS: EventType[] = ['club'];

export interface StatMeta {
  uiComponent: UiComponentKey;
  appliesTo?: EventType[] | 'ALL';
  recommendedFor?: EventType[];
  tags?: string[];
  label: string;
  description?: string | null;
  icon?: string;
  group?: string;
  inputComponent: InputComponentKey | null;
  unit?: string;
  // extra liberi
  updateFreqMin?: number;
  thresholds?: any;
  [key: string]: any;
}

export const M = {
  MUSIC: {
    label: 'Musica',
    items: ['club'] as EventType[],
  }
} as const;



