// services/stats-provider.ts
import { StatMeta, EventType } from '../stat-visual-map';

export interface StatsProvider {
  /** Mappa completa id -> meta (etichetta, gruppo, descrizione, ecc.) */
  getStatsMeta(): Record<string, StatMeta>;

  /** (Opz.) quali stats consigliare per l’eventType */
  getRecommendedStatIds?(eventType: EventType): string[];
}
