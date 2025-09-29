// stat-visual-map.ts
// ─────────────────────────────────────────────────────────────────────────────
// Ogni statistica ora ha:
//  - component: il tuo componente grafico
//  - appliesTo: lista di tipologie evento a cui ha senso mostrarla (o 'ALL')
//  - recommendedFor (opzionale): sottoinsieme in cui è consigliata di default
//  - tags (opzionale): utile per filtri FE
// Fornisco anche helper per ricavare le statistiche per un certo evento.
// ─────────────────────────────────────────────────────────────────────────────

export type ComponentKey =
  | 'BarRatingCardComponent'
  | 'CircleRatingCardComponent'
  | 'DiscreteHistogramCardComponent'
  | 'DonutChartCardComponent'
  | 'EnumPillCardComponent'
  | 'GaugeMetricCardComponent'
  | 'MinimalTimelineCardComponent'
  | 'ProgressMetricCardComponent'
  | 'RankingListCardComponent'
  | 'SparklineKpiCardComponent'
  | 'StackedProgressCardComponent';

export const REGISTRY_COMPONENT_SELECTOR: Record<ComponentKey, string> = {
  BarRatingCardComponent:        'app-bar-rating-card',
  CircleRatingCardComponent:     'app-circle-rating-card',
  DiscreteHistogramCardComponent:'app-discret-histogram-card',
  DonutChartCardComponent:       'app-donut-chart-card',
  EnumPillCardComponent:         'app-enum-pill-card',
  GaugeMetricCardComponent:      'app-gauge-metric-card',
  MinimalTimelineCardComponent:  'app-minimal-timline-card',
  ProgressMetricCardComponent:   'app-progress-metric-card',
  RankingListCardComponent:      'app-ranking-list-card',
  SparklineKpiCardComponent:     'app-sprkline-kpi-card',
  StackedProgressCardComponent:  'app-stacked-progress-card',
};

// ─────────────────────────────────────────────────────────────────────────────
// TIPI EVENTO (slugs stabili, usali ovunque)
// ─────────────────────────────────────────────────────────────────────────────
export type EventType =
  | 'club'                // Discoteca / Club
  | 'concert'             // Concerto
  | 'festival'            // Festival musicale
  | 'conference'          // Conferenza
  | 'expo'                // Fiera / Expo
  | 'theater'             // Teatro
  | 'cinema'              // Cinema / Première
  | 'stadium'             // Partita sportiva (stadio)
  | 'marathon'            // Maratona / Corsa
  | 'esports'             // eSports / Torneo gaming
  | 'food_festival'       // Street Food / Food Festival
  | 'market'              // Mercato / Night market
  | 'museum'              // Mostra / Museo (evento)
  | 'theme_park'          // Theme Park / Giornata speciale
  | 'wedding'             // Wedding / Ricevimento
  | 'open_day'            // University Open Day
  | 'charity_gala'        // Charity Gala
  | 'coworking'           // Co-working / Hub
  | 'meetup'              // Meetup / Community Night
  | 'wellness'            // Yoga / Wellness
  | 'book_fair'           // Book Fair / Libreria evento
  | 'demo_day'            // Startup Demo Day
  | 'lan_party'           // LAN Party
  | 'corporate_event';    // Evento aziendale generico

export const ALL_EVENTS: EventType[] = [
  'club','concert','festival','conference','expo','theater','cinema','stadium','marathon','esports',
  'food_festival','market','museum','theme_park','wedding','open_day','charity_gala','coworking',
  'meetup','wellness','book_fair','demo_day','lan_party','corporate_event'
];

// Shortcut utili
// PRIMA (solo array)
// const M = { MUSIC: ['club','concert','festival'] as EventType[], ... }

// DOPO (stessa chiave, ma con label + items)
export const M = {
  MUSIC: {
    label: 'Musica',
    items: ['club','concert','festival'] as EventType[],
  },
  BIZ: {
    label: 'Business',
    items: ['conference','expo','corporate_event','demo_day','open_day','meetup'] as EventType[],
  },
  FOOD: {
    label: 'Cibo & Beverage',
    items: ['food_festival','market','expo','corporate_event','wedding'] as EventType[],
  },
  ARTS: {
    label: 'Arte & Cultura',
    items: ['theater','cinema','museum','book_fair'] as EventType[],
  },
  SPORT: {
    label: 'Sport',
    items: ['stadium','marathon'] as EventType[],
  },
  GAMING: {
    label: 'Gaming',
    items: ['esports','lan_party'] as EventType[],
  },
  PARK: {
    label: 'Parchi & Attrazioni',
    items: ['theme_park'] as EventType[],
  },
  NICHE: {
    label: 'Nicchia',
    items: ['coworking','wellness'] as EventType[],
  },
  ALL: {
    label: 'Tutte le tipologie',
    items: ALL_EVENTS,
  },
} as const;


export type DataType = 'number' | 'percent' | 'rating' | 'boolean' | 'enum' | 'rate' | 'distribution' | 'timeline';

export const DATATYPE_DEFAULTS: Record<DataType, ComponentKey> = {
  number:       'ProgressMetricCardComponent',
  percent:      'ProgressMetricCardComponent',
  rating:       'BarRatingCardComponent',
  boolean:      'EnumPillCardComponent',
  enum:         'EnumPillCardComponent',
  rate:         'SparklineKpiCardComponent',
  distribution: 'DiscreteHistogramCardComponent',
  timeline:     'MinimalTimelineCardComponent',
};

// ─────────────────────────────────────────────────────────────────────────────
// META STATISTICHE: componente + eventi a cui si applica (+ raccomandate)
// ─────────────────────────────────────────────────────────────────────────────
export interface StatMeta {
  component: ComponentKey;
  appliesTo: EventType[] | 'ALL';
  recommendedFor?: EventType[];
  tags?: string[];
  label: string;
  description?: string       // descrizione estesa (opzionale)
  group?: string       // descrizione estesa (opzionale)
}

export const STAT_META: Record<string, StatMeta> = {
  // Queue & Flow
  queue_wait_time:      { label: 'Tempo Attesa Coda', description: 'Tempo medio di attesa per l’ingresso', group: 'Dati Affollamento', component: 'GaugeMetricCardComponent', appliesTo: 'ALL', recommendedFor: [...M.MUSIC.items, ...M.SPORT.items, 'expo','museum','theme_park','food_festival','market','cinema'] },
  queue_p95:            { label: 'Coda (95° Percentile)', description: 'Attesa massima per il 95% dei partecipanti', group: 'Dati Affollamento', component: 'ProgressMetricCardComponent', appliesTo: 'ALL' },
  entries_per_min:      { label: 'Ingressi al Minuto', description: 'Numero ingressi al minuto', group: 'Dati Affollamento', component: 'SparklineKpiCardComponent', appliesTo: 'ALL', recommendedFor: [...M.MUSIC.items, ...M.SPORT.items, 'expo','cinema','theater'] },
  throughput_gate:      { label: 'Flusso Ingressi Gate', description: 'Flusso medio per gate', group: 'Dati Affollamento', component: 'SparklineKpiCardComponent', appliesTo: [...M.MUSIC.items, ...M.SPORT.items, 'expo','theme_park','cinema'] },

  // Crowding / Capacity
  area_crowding_pct:    { label: 'Affollamento Aree (%)', description: 'Percentuale di affollamento nelle aree', group: 'Dati Affollamento', component: 'ProgressMetricCardComponent', appliesTo: 'ALL', recommendedFor: M.ALL.items },
  capacity_utilization: { label: 'Utilizzo Capienza', description: 'Percentuale capacità utilizzata', group: 'Dati Affollamento', component: 'ProgressMetricCardComponent', appliesTo: 'ALL', recommendedFor: M.ALL.items },

  // Facilities
  restroom_wait:        { label: 'Attesa Bagni', description: 'Tempo medio di attesa ai bagni', group: 'Servizi & Facilities', component: 'GaugeMetricCardComponent', appliesTo: 'ALL', recommendedFor: [...M.MUSIC.items, ...M.SPORT.items, ...M.PARK.items, 'expo','cinema','theater','food_festival','market'] },
  cleanliness_rating:   { label: 'Pulizia', description: 'Valutazione media pulizia', group: 'Servizi & Facilities', component: 'BarRatingCardComponent', appliesTo: 'ALL', recommendedFor: M.ALL.items },
  accessibility_ok:     { label: 'Accessibilità', description: 'Accessibilità venue', group: 'Servizi & Facilities', component: 'EnumPillCardComponent', appliesTo: 'ALL', recommendedFor: ['conference','expo','theater','cinema','museum','open_day','corporate_event','wedding'] },

  // Program
  schedule_delay:       { label: 'Ritardo Programma', description: 'Ritardo medio rispetto all’orario previsto', group: 'Programma & Contenuti', component: 'ProgressMetricCardComponent', appliesTo: 'ALL', recommendedFor: [...M.MUSIC.items, 'conference','theater','cinema','open_day','demo_day'] },
  timeline_program:     { label: 'Timeline Programma', description: 'Andamento del programma', group: 'Programma & Contenuti', component: 'MinimalTimelineCardComponent', appliesTo: [...M.MUSIC.items,'conference','theater','cinema','demo_day'] },

  // Engagement / Sentiment
  feedback_volume_per_min:{ label: 'Feedback al Minuto', description: 'Numero di feedback ricevuti al minuto', group: 'Engagement & Sentiment', component: 'SparklineKpiCardComponent', appliesTo: 'ALL', recommendedFor: M.ALL.items },
  nps_live:             { label: 'NPS Live', description: 'Net Promoter Score live', group: 'Engagement & Sentiment', component: 'ProgressMetricCardComponent', appliesTo: 'ALL' },
  sentiment_share:      { label: 'Distribuzione Sentiment', description: 'Percentuale di sentiment positivo/negativo', group: 'Engagement & Sentiment', component: 'StackedProgressCardComponent', appliesTo: 'ALL' },

  // Comfort / Ambient
  temperature_comfort:  { label: 'Comfort Termico', description: 'Valutazione comfort termico', group: 'Comfort Ambientale', component: 'EnumPillCardComponent', appliesTo: 'ALL' },
  price_fairness:       { label: 'Equità Prezzi', description: 'Percezione giustizia dei prezzi', group: 'Comfort Ambientale', component: 'EnumPillCardComponent', appliesTo: [...M.FOOD.items, ...M.SPORT.items, ...M.MUSIC.items, 'cinema','theater'] },

  // Food & Beverage
  drink_quality:        { label: 'Qualità Drink', description: 'Valutazione qualità bevande', group: 'Food & Beverage', component: 'BarRatingCardComponent', appliesTo: [...M.MUSIC.items, ...M.FOOD.items, 'cinema','theater','wedding'], recommendedFor: ['club','festival','food_festival','wedding'] },
  food_quality:         { label: 'Qualità Cibo', description: 'Valutazione qualità cibo', group: 'Food & Beverage', component: 'BarRatingCardComponent', appliesTo: [...M.FOOD.items, 'expo','market','theme_park','stadium','wedding'] },
  food_stand_wait:      { label: 'Attesa Stand Cibo', description: 'Tempo medio di attesa agli stand cibo', group: 'Food & Beverage', component: 'GaugeMetricCardComponent', appliesTo: [...M.FOOD.items, 'festival','stadium','theme_park','expo','market','cinema'] },
  pos_tx_per_min:       { label: 'Transazioni POS/min', description: 'Numero transazioni POS/minuto', group: 'Food & Beverage', component: 'SparklineKpiCardComponent', appliesTo: [...M.FOOD.items, 'expo','stadium','theme_park','market','cinema'] },
  bar_satisfaction_index:{ label: 'Indice Soddisfazione Bar', description: 'Indice gradimento bar', group: 'Food & Beverage', component: 'ProgressMetricCardComponent', appliesTo: ['club','festival','food_festival','wedding','stadium','market'] },
  avg_basket_value:     { label: 'Scontrino Medio', description: 'Valore medio scontrino', group: 'Food & Beverage', component: 'ProgressMetricCardComponent', appliesTo: [...M.FOOD.items, 'expo','market','cinema','stadium'] },
  payments_mix:         { label: 'Metodi di Pagamento', description: 'Distribuzione metodi di pagamento', group: 'Food & Beverage', component: 'DonutChartCardComponent', appliesTo: [...M.FOOD.items, 'expo','market','stadium','theme_park','cinema'] },

  // Audio / Video & Comfort
  sound_intensity_mode: { label: 'Intensità Audio', description: 'Livello volume medio', group: 'Audio & Video', component: 'EnumPillCardComponent', appliesTo: [...M.MUSIC.items,'theater','cinema','wedding'], recommendedFor: ['club','concert','festival'] },
  sound_quality:        { label: 'Qualità Audio', description: 'Valutazione qualità audio', group: 'Audio & Video', component: 'BarRatingCardComponent', appliesTo: [...M.MUSIC.items,'theater','cinema'], recommendedFor: ['concert','theater'] },
  video_quality:        { label: 'Qualità Video', description: 'Valutazione proiezione/video', group: 'Audio & Video', component: 'BarRatingCardComponent', appliesTo: ['cinema','theater','conference','expo','esports'] },
  light_comfort:        { label: 'Comfort Luminoso', description: 'Valutazione comfort luminoso', group: 'Audio & Video', component: 'EnumPillCardComponent', appliesTo: ['theater','cinema','conference','museum','wedding','wellness'] },

  // Program & Content
  act_popularity:       { label: 'Popolarità Atto', description: 'Gradimento performance', group: 'Programma & Contenuti', component: 'BarRatingCardComponent', appliesTo: [...M.MUSIC.items,'theater','esports','meetup','demo_day'] },
  act_switch_gap:       { label: 'Gap Cambio Atto', description: 'Tempo medio cambio atto', group: 'Programma & Contenuti', component: 'MinimalTimelineCardComponent', appliesTo: [...M.MUSIC.items,'conference','theater'] },
  setlist_progress:     { label: 'Avanzamento Scaletta', description: 'Percentuale completamento setlist', group: 'Programma & Contenuti', component: 'ProgressMetricCardComponent', appliesTo: [...M.MUSIC.items] },

  // Facilities & Venue
  cleanliness_rating_area:{ label: 'Pulizia (Area)', description: 'Valutazione pulizia per area', group: 'Servizi & Facilities', component: 'BarRatingCardComponent', appliesTo: 'ALL' },
  restroom_wait_area:   { label: 'Attesa Bagni (Area)', description: 'Attesa media bagni per area', group: 'Servizi & Facilities', component: 'GaugeMetricCardComponent', appliesTo: 'ALL' },
  accessibility_ok_area:{ label: 'Accessibilità (Area)', description: 'Accessibilità area specifica', group: 'Servizi & Facilities', component: 'EnumPillCardComponent', appliesTo: 'ALL' },
  lost_found_reports:   { label: 'Oggetti Smarriti', description: 'Report oggetti smarriti', group: 'Servizi & Facilities', component: 'SparklineKpiCardComponent', appliesTo: ['expo','conference','theater','cinema','museum','open_day','theme_park','corporate_event'] },

  // Network & Tech
  wifi_quality:         { label: 'Qualità Wi-Fi', description: 'Valutazione connessione Wi-Fi', group: 'Network & Tech', component: 'BarRatingCardComponent', appliesTo: 'ALL', recommendedFor: ['conference','expo','coworking','lan_party','esports','open_day'] },
  wifi_connected_users: { label: 'Utenti Connessi Wi-Fi', description: 'Numero utenti connessi', group: 'Network & Tech', component: 'ProgressMetricCardComponent', appliesTo: ['conference','expo','coworking','lan_party','esports','open_day','corporate_event'] },
  app_engagement_rate:  { label: 'Engagement App', description: 'Tasso utilizzo app evento', group: 'Network & Tech', component: 'ProgressMetricCardComponent', appliesTo: 'ALL', recommendedFor: ['conference','expo','festival','open_day','esports'] },
  bandwidth_utilization:{ label: 'Utilizzo Banda', description: 'Percentuale banda utilizzata', group: 'Network & Tech', component: 'ProgressMetricCardComponent', appliesTo: ['lan_party','esports','coworking','conference'] },

  // Safety & Compliance
  security_incidents:   { label: 'Incidenti Sicurezza', description: 'Numero incidenti sicurezza', group: 'Sicurezza & Compliance', component: 'SparklineKpiCardComponent', appliesTo: [...M.SPORT.items,'festival','expo','theme_park'] },
  weather_index:        { label: 'Indice Meteo', description: 'Indice condizioni meteo', group: 'Sicurezza & Compliance', component: 'ProgressMetricCardComponent', appliesTo: ['festival','marathon','food_festival','market','theme_park','stadium'] },

  // Commerce & Merch
  merch_tx_per_min:     { label: 'Transazioni Merch/min', description: 'Numero transazioni merchandise al minuto', group: 'Commercio & Merch', component: 'SparklineKpiCardComponent', appliesTo: ['festival','stadium','esports','theme_park','expo'] },

  // Mobility
  parking_occupancy:    { label: 'Occupazione Parcheggio', description: 'Percentuale occupazione parcheggi', group: 'Mobilità', component: 'ProgressMetricCardComponent', appliesTo: ['stadium','marathon','expo','theme_park','food_festival','market'] },
  shuttle_wait_time:    { label: 'Attesa Navette', description: 'Tempo attesa medio navette', group: 'Mobilità', component: 'GaugeMetricCardComponent', appliesTo: ['stadium','marathon','expo','theme_park','open_day'] },
  arrival_peak_time:    { label: 'Orario Picco Arrivi', description: 'Orario di maggiori arrivi', group: 'Mobilità', component: 'MinimalTimelineCardComponent', appliesTo: ['stadium','marathon','expo','festival','open_day'] },

  // Engagement & Sentiment (esteso)
  sentiment_distribution:{ label: 'Distribuzione Sentiment (Esteso)', description: 'Distribuzione dettagliata sentiment', group: 'Engagement & Sentiment', component: 'StackedProgressCardComponent', appliesTo: 'ALL' },
  rating_distribution:  { label: 'Distribuzione Valutazioni', description: 'Distribuzione valutazioni utenti', group: 'Engagement & Sentiment', component: 'DiscreteHistogramCardComponent', appliesTo: 'ALL' },

  // Co-working / Hub
  occupancy_pct:        { label: 'Occupazione', description: 'Percentuale occupazione spazi', group: 'Nicchia - Co-working', component: 'ProgressMetricCardComponent', appliesTo: ['coworking'], recommendedFor: ['coworking'] },
  meeting_room_wait:    { label: 'Attesa Sale Riunioni', description: 'Tempo medio attesa sale riunioni', group: 'Nicchia - Co-working', component: 'GaugeMetricCardComponent', appliesTo: ['coworking'], recommendedFor: ['coworking'] },
  noise_level_mode:     { label: 'Rumorosità', description: 'Livello rumorosità ambiente', group: 'Nicchia - Co-working', component: 'EnumPillCardComponent', appliesTo: ['coworking'] },
  coffee_bar_queue:     { label: 'Coda Coffee Bar', description: 'Tempo medio coda al coffee bar', group: 'Nicchia - Co-working', component: 'GaugeMetricCardComponent', appliesTo: ['coworking'] },
  community_engagement: { label: 'Engagement Community', description: 'Coinvolgimento community coworking', group: 'Nicchia - Co-working', component: 'ProgressMetricCardComponent', appliesTo: ['coworking'] },
  tickets_open_per_hour:{ label: 'Ticket Aperti/ora', description: 'Numero ticket aperti ogni ora', group: 'Nicchia - Co-working', component: 'SparklineKpiCardComponent', appliesTo: ['coworking'] },
  satisfaction_index:   { label: 'Indice Soddisfazione', description: 'Indice di soddisfazione utenti coworking', group: 'Nicchia - Co-working', component: 'ProgressMetricCardComponent', appliesTo: ['coworking'] },

  // Fitness / Wellness
  room_crowding_pct:    { label: 'Affollamento Sala (%)', description: 'Percentuale affollamento sale', group: 'Wellness & Fitness', component: 'ProgressMetricCardComponent', appliesTo: ['wellness','conference','coworking'] },
  satisfaction_after_session:{ label: 'Soddisfazione Post Sessione', description: 'Valutazione post attività', group: 'Wellness & Fitness', component: 'BarRatingCardComponent', appliesTo: ['wellness'] },

  // eSports / Gaming
  payments_mix_arena:   { label: 'Pagamenti Arena', description: 'Distribuzione pagamenti in arena', group: 'Gaming & eSports', component: 'DonutChartCardComponent', appliesTo: ['esports','lan_party'] },
  act_popularity_match: { label: 'Popolarità Match', description: 'Gradimento match eSports', group: 'Gaming & eSports', component: 'BarRatingCardComponent', appliesTo: ['esports'] },

  // Expo / Book Fair
  avg_basket_value_book:{ label: 'Scontrino Medio Libri', description: 'Valore medio acquisti libri', group: 'Commercio & Merch', component: 'ProgressMetricCardComponent', appliesTo: ['book_fair','expo','market'] },

  // Sport / Stadium
  match_excitement:     { label: 'Emozione Match', description: 'Indice emozione evento sportivo', group: 'Sport & Stadium', component: 'BarRatingCardComponent', appliesTo: ['stadium'] },
  gate_throughput:      { label: 'Flusso Gate', description: 'Numero persone per minuto ai gate', group: 'Sport & Stadium', component: 'SparklineKpiCardComponent', appliesTo: ['stadium'] },
  crowding_gate_pct:    { label: 'Affollamento Gate (%)', description: 'Percentuale affollamento gate', group: 'Sport & Stadium', component: 'ProgressMetricCardComponent', appliesTo: ['stadium'] },

  // Festival multi-area
  area_heatmap_crowding:{ label: 'Heatmap Affollamento Aree', description: 'Mappa affollamento per area', group: 'Dati Affollamento', component: 'RankingListCardComponent', appliesTo: ['festival','expo','theme_park','stadium','market'] },
}


// (Opzionale) Alias per metriche parametriche
export const STAT_ALIASES: Record<string, string> = {
  'restroom_wait:area':         'restroom_wait',
  'area_crowding_pct:area':     'area_crowding_pct',
  'queue_wait_time:area':       'queue_wait_time',
  'food_stand_wait:stand':      'food_stand_wait',
  'act_popularity:session':     'act_popularity',
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper: ricavare cosa mostrare per una tipologia evento
// ─────────────────────────────────────────────────────────────────────────────
export function getStatsForEvent(eventType: EventType) {
  const entries = Object.entries(STAT_META)
    .filter(([_, meta]) => meta.appliesTo === 'ALL' || (meta.appliesTo as EventType[]).includes(eventType))
    .map(([id, meta]) => ({
      id,
      component: meta.component,
      selector: REGISTRY_COMPONENT_SELECTOR[meta.component],
      recommended: !!meta.recommendedFor?.includes(eventType),
    }));

  // Ordina mettendo prima le consigliate
  entries.sort((a, b) => Number(b.recommended) - Number(a.recommended) || a.id.localeCompare(b.id));
  return entries;
}

// Helper: dato statId → componente (fallback se non presente)
export function resolveComponentForStat(
  statId: string,
  fallbackByType?: DataType
): { component: ComponentKey; selector: string } | null {
  const id = STAT_ALIASES[statId] ?? statId;
  const meta = STAT_META[id];
  if (meta) return { component: meta.component, selector: REGISTRY_COMPONENT_SELECTOR[meta.component] };
  if (fallbackByType) {
    const comp = DATATYPE_DEFAULTS[fallbackByType];
    return { component: comp, selector: REGISTRY_COMPONENT_SELECTOR[comp] };
  }
  return null;
}
