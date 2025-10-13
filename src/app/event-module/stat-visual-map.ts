// stat-visual-map.ts
// ─────────────────────────────────────────────────────────────────────────────
// Ogni statistica ora ha:
//  - component: il tuo componente grafico
//  - appliesTo: lista di tipologie evento a cui ha senso mostrarla (o 'ALL')
//  - recommendedFor (opzionale): sottoinsieme in cui è consigliata di default
//  - tags (opzionale): utile per filtri FE
// Fornisco anche helper per ricavare le statistiche per un certo evento.
// ─────────────────────────────────────────────────────────────────────────────

export type UiComponentKey =
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
  | 'StackedProgressCardComponent'
  | 'WaitTimePillsComponent'

  export type InputComponentKey = 
   | 'ChipSelectorComponent'
   | 'IconButtonGroupComponent'
   | 'IconRatingComponent'
   | 'RangeSliderComponent'
   | 'RatingCirclesComponent'
   | 'SegmentedControlComponent'
   | 'ToggleSwitchComponent';

export const REGISTRY_COMPONENT_SELECTOR: Record<UiComponentKey, string> = {
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
  WaitTimePillsComponent:        'app-wait-time-pills'
};

export const REGISTRY_INPUT_COMPONENT_SELECTOR: Record<InputComponentKey, string> = {
  ChipSelectorComponent:        'app-chip-selector',
  IconButtonGroupComponent:     'app-icon-button-group',
  IconRatingComponent:          'app-icon-rating',
  RangeSliderComponent:         'app-range-slider',
  RatingCirclesComponent:       'app-rating-circle',
  SegmentedControlComponent:    'app-segmented-control',
  ToggleSwitchComponent:        'app-toggle-switch'
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

export const DATATYPE_DEFAULTS: Record<DataType, UiComponentKey> = {
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
  uiComponent: UiComponentKey;
  appliesTo?: EventType[] | 'ALL';
  recommendedFor?: EventType[];
  tags?: string[];
  label: string;
  description?: string 
  icon?: string;      // descrizione estesa (opzionale)
  group?: string       // descrizione estesa (opzionale)
  inputComponent: InputComponentKey
  [key: string]: any; // 👈 aggiungi questa riga per permettere metadati extra
  unit?: string;

}

export let STAT_META: Record<string, StatMeta> = {
  // Queue & Flow
  queue_wait_time:      { label: 'Tempo Attesa Coda', description: 'Tempo medio di attesa per l’ingresso', group: 'Dati Affollamento', uiComponent: 'WaitTimePillsComponent', inputComponent: 'RangeSliderComponent' },
  queue_p95:            { label: 'Coda (95° Percentile)', description: 'Attesa massima per il 95% dei partecipanti', group: 'Dati Affollamento', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  entries_per_min:      { label: 'Ingressi al Minuto', description: 'Numero ingressi al minuto', group: 'Dati Affollamento', uiComponent: 'RankingListCardComponent', inputComponent: 'RangeSliderComponent' },
  throughput_gate:      { label: 'Flusso Ingressi Gate', description: 'Flusso medio per gate', group: 'Dati Affollamento', uiComponent: 'GaugeMetricCardComponent', inputComponent: 'RangeSliderComponent' },

  // Crowding / Capacity
  area_crowding_pct:    { label: 'Affollamento Aree (%)', description: 'Percentuale di affollamento nelle aree', group: 'Dati Affollamento', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  capacity_utilization: { label: 'Utilizzo Capienza', description: 'Percentuale capacità utilizzata', group: 'Dati Affollamento', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },

  // Facilities
  restroom_wait:        { label: 'Attesa Bagni', description: 'Tempo medio di attesa ai bagni', group: 'Servizi & Facilities', uiComponent: 'GaugeMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  cleanliness_rating:   { label: 'Pulizia', description: 'Valutazione media pulizia', group: 'Servizi & Facilities', uiComponent: 'BarRatingCardComponent', inputComponent: 'RatingCirclesComponent' },
  accessibility_ok:     { label: 'Accessibilità', description: 'Accessibilità venue', group: 'Servizi & Facilities', uiComponent: 'EnumPillCardComponent', inputComponent: 'ToggleSwitchComponent' },

  // Program
  schedule_delay:       { label: 'Ritardo Programma', description: 'Ritardo medio rispetto all’orario previsto', group: 'Programma & Contenuti', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  timeline_program:     { label: 'Timeline Programma', description: 'Andamento del programma', group: 'Programma & Contenuti', uiComponent: 'MinimalTimelineCardComponent', inputComponent: 'SegmentedControlComponent' },

  // Engagement / Sentiment
  feedback_volume_per_min:{ label: 'Feedback al Minuto', description: 'Numero di feedback ricevuti al minuto', group: 'Engagement & Sentiment', uiComponent: 'SparklineKpiCardComponent', inputComponent: 'RangeSliderComponent' },
  nps_live:             { label: 'NPS Live', description: 'Net Promoter Score live', group: 'Engagement & Sentiment', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  sentiment_share:      { label: 'Distribuzione Sentiment', description: 'Percentuale di sentiment positivo/negativo', group: 'Engagement & Sentiment', uiComponent: 'StackedProgressCardComponent', inputComponent: 'ChipSelectorComponent' },

  // Comfort / Ambient
  temperature_comfort:  { label: 'Comfort Termico', description: 'Valutazione comfort termico', group: 'Comfort Ambientale', uiComponent: 'EnumPillCardComponent', inputComponent: 'ChipSelectorComponent' },
  price_fairness:       { label: 'Equità Prezzi', description: 'Percezione giustizia dei prezzi', group: 'Comfort Ambientale', uiComponent: 'EnumPillCardComponent', inputComponent: 'ChipSelectorComponent' },

  // Food & Beverage
  drink_quality:        { label: 'Qualità Drink', description: 'Valutazione qualità bevande', group: 'Food & Beverage', uiComponent: 'BarRatingCardComponent', inputComponent: 'RatingCirclesComponent' },
  food_quality:         { label: 'Qualità Cibo', description: 'Valutazione qualità cibo', group: 'Food & Beverage', uiComponent: 'BarRatingCardComponent', inputComponent: 'RatingCirclesComponent' },
  food_stand_wait:      { label: 'Attesa Stand Cibo', description: 'Tempo medio di attesa agli stand cibo', group: 'Food & Beverage', uiComponent: 'GaugeMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  pos_tx_per_min:       { label: 'Transazioni POS/min', description: 'Numero transazioni POS/minuto', group: 'Food & Beverage', uiComponent: 'SparklineKpiCardComponent', inputComponent: 'RangeSliderComponent' },
  bar_satisfaction_index:{ label: 'Indice Soddisfazione Bar', description: 'Indice gradimento bar', group: 'Food & Beverage', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  avg_basket_value:     { label: 'Scontrino Medio', description: 'Valore medio scontrino', group: 'Food & Beverage', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  payments_mix:         { label: 'Metodi di Pagamento', description: 'Distribuzione metodi di pagamento', group: 'Food & Beverage', uiComponent: 'DonutChartCardComponent', inputComponent: 'IconButtonGroupComponent' },

  // Audio / Video & Comfort
  sound_intensity_mode: { label: 'Intensità Audio', description: 'Livello volume medio', group: 'Audio & Video', uiComponent: 'EnumPillCardComponent', inputComponent: 'ChipSelectorComponent' },
  sound_quality:        { label: 'Qualità Audio', description: 'Valutazione qualità audio', group: 'Audio & Video', uiComponent: 'BarRatingCardComponent', inputComponent: 'RatingCirclesComponent' },
  video_quality:        { label: 'Qualità Video', description: 'Valutazione proiezione/video', group: 'Audio & Video', uiComponent: 'BarRatingCardComponent', inputComponent: 'RatingCirclesComponent' },
  light_comfort:        { label: 'Comfort Luminoso', description: 'Valutazione comfort luminoso', group: 'Audio & Video', uiComponent: 'EnumPillCardComponent', inputComponent: 'ChipSelectorComponent' },

  // Program & Content
  act_popularity:       { label: 'Popolarità Atto', description: 'Gradimento performance', group: 'Programma & Contenuti', uiComponent: 'BarRatingCardComponent', inputComponent: 'RatingCirclesComponent' },
  act_switch_gap:       { label: 'Gap Cambio Atto', description: 'Tempo medio cambio atto', group: 'Programma & Contenuti', uiComponent: 'MinimalTimelineCardComponent', inputComponent: 'SegmentedControlComponent' },
  setlist_progress:     { label: 'Avanzamento Scaletta', description: 'Percentuale completamento setlist', group: 'Programma & Contenuti', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },

  // Facilities & Venue
  cleanliness_rating_area:{ label: 'Pulizia (Area)', description: 'Valutazione pulizia per area', group: 'Servizi & Facilities', uiComponent: 'BarRatingCardComponent', inputComponent: 'RatingCirclesComponent' },
  restroom_wait_area:   { label: 'Attesa Bagni (Area)', description: 'Attesa media bagni per area', group: 'Servizi & Facilities', uiComponent: 'GaugeMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  accessibility_ok_area:{ label: 'Accessibilità (Area)', description: 'Accessibilità area specifica', group: 'Servizi & Facilities', uiComponent: 'EnumPillCardComponent', inputComponent: 'ToggleSwitchComponent' },
  lost_found_reports:   { label: 'Oggetti Smarriti', description: 'Report oggetti smarriti', group: 'Servizi & Facilities', uiComponent: 'SparklineKpiCardComponent', inputComponent: 'RangeSliderComponent' },

  // Network & Tech
  wifi_quality:         { label: 'Qualità Wi-Fi', description: 'Valutazione connessione Wi-Fi', group: 'Network & Tech', uiComponent: 'BarRatingCardComponent', inputComponent: 'RatingCirclesComponent' },
  wifi_connected_users: { label: 'Utenti Connessi Wi-Fi', description: 'Numero utenti connessi', group: 'Network & Tech', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  app_engagement_rate:  { label: 'Engagement App', description: 'Tasso utilizzo app evento', group: 'Network & Tech', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  bandwidth_utilization:{ label: 'Utilizzo Banda', description: 'Percentuale banda utilizzata', group: 'Network & Tech', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },

  // Safety & Compliance
  security_incidents:   { label: 'Incidenti Sicurezza', description: 'Numero incidenti sicurezza', group: 'Sicurezza & Compliance', uiComponent: 'SparklineKpiCardComponent', inputComponent: 'RangeSliderComponent' },
  weather_index:        { label: 'Indice Meteo', description: 'Indice condizioni meteo', group: 'Sicurezza & Compliance', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'ChipSelectorComponent' },

  // Commerce & Merch
  merch_tx_per_min:     { label: 'Transazioni Merch/min', description: 'Numero transazioni merchandise al minuto', group: 'Commercio & Merch', uiComponent: 'SparklineKpiCardComponent', inputComponent: 'RangeSliderComponent' },

  // Mobility
  parking_occupancy:    { label: 'Occupazione Parcheggio', description: 'Percentuale occupazione parcheggi', group: 'Mobilità', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  shuttle_wait_time:    { label: 'Attesa Navette', description: 'Tempo attesa medio navette', group: 'Mobilità', uiComponent: 'GaugeMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  arrival_peak_time:    { label: 'Orario Picco Arrivi', description: 'Orario di maggiori arrivi', group: 'Mobilità', uiComponent: 'MinimalTimelineCardComponent', inputComponent: 'SegmentedControlComponent' },

  // Engagement & Sentiment (esteso)
  sentiment_distribution:{ label: 'Distribuzione Sentiment (Esteso)', description: 'Distribuzione dettagliata sentiment', group: 'Engagement & Sentiment', uiComponent: 'StackedProgressCardComponent', inputComponent: 'ChipSelectorComponent' },
  rating_distribution:  { label: 'Distribuzione Valutazioni', description: 'Distribuzione valutazioni utenti', group: 'Engagement & Sentiment', uiComponent: 'DiscreteHistogramCardComponent', inputComponent: 'ChipSelectorComponent' },

  // Co-working / Hub
  occupancy_pct:        { label: 'Occupazione', description: 'Percentuale occupazione spazi', group: 'Nicchia - Co-working', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  meeting_room_wait:    { label: 'Attesa Sale Riunioni', description: 'Tempo medio attesa sale riunioni', group: 'Nicchia - Co-working', uiComponent: 'GaugeMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  noise_level_mode:     { label: 'Rumorosità', description: 'Livello rumorosità ambiente', group: 'Nicchia - Co-working', uiComponent: 'EnumPillCardComponent', inputComponent: 'ChipSelectorComponent' },
  coffee_bar_queue:     { label: 'Coda Coffee Bar', description: 'Tempo medio coda al coffee bar', group: 'Nicchia - Co-working', uiComponent: 'GaugeMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  community_engagement: { label: 'Engagement Community', description: 'Coinvolgimento community coworking', group: 'Nicchia - Co-working', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  tickets_open_per_hour:{ label: 'Ticket Aperti/ora', description: 'Numero ticket aperti ogni ora', group: 'Nicchia - Co-working', uiComponent: 'SparklineKpiCardComponent', inputComponent: 'RangeSliderComponent' },
  satisfaction_index:   { label: 'Indice Soddisfazione', description: 'Indice di soddisfazione utenti coworking', group: 'Nicchia - Co-working', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },

  // Fitness / Wellness
  room_crowding_pct:    { label: 'Affollamento Sala (%)', description: 'Percentuale affollamento sale', group: 'Wellness & Fitness', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },
  satisfaction_after_session:{ label: 'Soddisfazione Post Sessione', description: 'Valutazione post attività', group: 'Wellness & Fitness', uiComponent: 'BarRatingCardComponent', inputComponent: 'RatingCirclesComponent' },

  // eSports / Gaming
  payments_mix_arena:   { label: 'Pagamenti Arena', description: 'Distribuzione pagamenti in arena', group: 'Gaming & eSports', uiComponent: 'DonutChartCardComponent', inputComponent: 'IconButtonGroupComponent' },
  act_popularity_match: { label: 'Popolarità Match', description: 'Gradimento match eSports', group: 'Gaming & eSports', uiComponent: 'CircleRatingCardComponent', inputComponent: 'RatingCirclesComponent' },

  // Expo / Book Fair
  avg_basket_value_book:{ label: 'Scontrino Medio Libri', description: 'Valore medio acquisti libri', group: 'Commercio & Merch', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },

  // Sport / Stadium
  match_excitement:     { label: 'Emozione Match', description: 'Indice emozione evento sportivo', group: 'Sport & Stadium', uiComponent: 'BarRatingCardComponent', inputComponent: 'RatingCirclesComponent' },
  gate_throughput:      { label: 'Flusso Gate', description: 'Numero persone per minuto ai gate', group: 'Sport & Stadium', uiComponent: 'SparklineKpiCardComponent', inputComponent: 'RangeSliderComponent' },
  crowding_gate_pct:    { label: 'Affollamento Gate (%)', description: 'Percentuale affollamento gate', group: 'Sport & Stadium', uiComponent: 'ProgressMetricCardComponent', inputComponent: 'RangeSliderComponent' },

  // Festival multi-area
  area_heatmap_crowding:{ label: 'Heatmap Affollamento Aree', description: 'Mappa affollamento per area', group: 'Dati Affollamento', uiComponent: 'RankingListCardComponent', inputComponent: 'IconButtonGroupComponent' },
}


// ⬇️ Estensione accurata: aggiungo SOLO `appliesTo` a STAT_META, senza toccare i tipi
Object.assign(STAT_META, {
  // ───────────── Queue & Flow ─────────────
  queue_wait_time:      { ...STAT_META['queue_wait_time'], appliesTo: [
    ...M.MUSIC.items, ...M.SPORT.items, ...M.PARK.items,
    'expo','food_festival','market','cinema','theater','conference','open_day','museum','book_fair','corporate_event','demo_day','meetup'
  ]},
  queue_p95:            { ...STAT_META['queue_p95'], appliesTo: [
    ...M.MUSIC.items, ...M.SPORT.items, ...M.PARK.items,
    'expo','food_festival','market','cinema','theater','conference','open_day','museum','book_fair','corporate_event','demo_day','meetup'
  ]},
  entries_per_min:      { ...STAT_META['entries_per_min'],      appliesTo: [
    ...M.MUSIC.items, ...M.SPORT.items, ...M.PARK.items,
    'expo','food_festival','market','cinema','theater','conference','open_day','museum','book_fair','corporate_event','demo_day','meetup'
  ]},
  throughput_gate:      { ...STAT_META['throughput_gate'],      appliesTo: [
    ...M.MUSIC.items, 'stadium','expo','theme_park'
  ]},

  // ────────── Crowding / Capacity ─────────
  area_crowding_pct:    { ...STAT_META['area_crowding_pct'],    appliesTo: [
    'club','concert','festival','expo','theme_park','stadium','market','food_festival','museum','conference','open_day','book_fair','corporate_event'
  ]},
  capacity_utilization: { ...STAT_META['capacity_utilization'], appliesTo: [
    'club','concert','festival','theater','cinema','stadium','conference','expo','theme_park','museum',
    'corporate_event','wedding','book_fair','esports','lan_party','open_day','demo_day','market','food_festival','meetup'
  ]},

  // ─────────── Facilities / Venue ─────────
  restroom_wait:        { ...STAT_META['restroom_wait'],        appliesTo: [
    ...M.MUSIC.items, ...M.SPORT.items, ...M.PARK.items, ...M.FOOD.items,
    'expo','cinema','theater','market','open_day','book_fair','conference','museum'
  ]},
  cleanliness_rating:   { ...STAT_META['cleanliness_rating'],   appliesTo: 'ALL' },
  accessibility_ok:     { ...STAT_META['accessibility_ok'],     appliesTo: 'ALL' },

  // ─────────── Program & Timeline ─────────
  schedule_delay:       { ...STAT_META['schedule_delay'],       appliesTo: [
    ...M.MUSIC.items, 'theater','cinema', ...M.BIZ.items, 'esports','stadium','meetup'
  ]},
  timeline_program:     { ...STAT_META['timeline_program'],     appliesTo: [
    ...M.MUSIC.items, 'theater','cinema', ...M.BIZ.items, 'esports','stadium'
  ]},

  // ─────── Engagement / Sentiment (base) ───────
  feedback_volume_per_min: { ...STAT_META['feedback_volume_per_min'], appliesTo: 'ALL' },
  nps_live:                { ...STAT_META['nps_live'],                appliesTo: 'ALL' },
  sentiment_share:         { ...STAT_META['sentiment_share'],         appliesTo: 'ALL' },

  // ─────────── Comfort / Ambient ──────────
  temperature_comfort:  { ...STAT_META['temperature_comfort'],  appliesTo: 'ALL' },
  price_fairness:       { ...STAT_META['price_fairness'],       appliesTo: [
    ...M.FOOD.items, ...M.SPORT.items, ...M.MUSIC.items, 'cinema','theater','theme_park','book_fair'
  ]},

  // ─────────── Food & Beverage ────────────
  drink_quality:        { ...STAT_META['drink_quality'],        appliesTo: [
    ...M.MUSIC.items, ...M.FOOD.items, 'cinema','theater','wedding','stadium'
  ]},
  food_quality:         { ...STAT_META['food_quality'],         appliesTo: [
    ...M.FOOD.items, 'theme_park','stadium'
  ]},
  food_stand_wait:      { ...STAT_META['food_stand_wait'],      appliesTo: [
    ...M.FOOD.items, 'festival','stadium','theme_park','expo','market','cinema'
  ]},
  pos_tx_per_min:       { ...STAT_META['pos_tx_per_min'],       appliesTo: [
    ...M.FOOD.items, 'expo','stadium','theme_park','market','cinema'
  ]},
  bar_satisfaction_index:{ ...STAT_META['bar_satisfaction_index'], appliesTo: [
    'club','festival','food_festival','wedding','stadium','market'
  ]},
  avg_basket_value:     { ...STAT_META['avg_basket_value'],     appliesTo: [
    ...M.FOOD.items, 'expo','market','cinema','stadium','theme_park','book_fair'
  ]},
  payments_mix:         { ...STAT_META['payments_mix'],         appliesTo: [
    ...M.FOOD.items, 'expo','market','stadium','theme_park','cinema'
  ]},

  // ─────────── Audio / Video ────────────
  sound_intensity_mode: { ...STAT_META['sound_intensity_mode'], appliesTo: [
    ...M.MUSIC.items,'theater','cinema','wedding'
  ]},
  sound_quality:        { ...STAT_META['sound_quality'],        appliesTo: [
    ...M.MUSIC.items,'theater','cinema'
  ]},
  video_quality:        { ...STAT_META['video_quality'],        appliesTo: [
    'cinema','theater','conference','expo','esports','demo_day','open_day'
  ]},
  light_comfort:        { ...STAT_META['light_comfort'],        appliesTo: [
    'theater','cinema','conference','museum','wedding','wellness'
  ]},

  // ──────── Program & Content (dettaglio) ────────
  act_popularity:       { ...STAT_META['act_popularity'],       appliesTo: [
    ...M.MUSIC.items,'theater','esports','meetup','demo_day'
  ]},
  act_switch_gap:       { ...STAT_META['act_switch_gap'],       appliesTo: [
    ...M.MUSIC.items,'conference','theater'
  ]},
  setlist_progress:     { ...STAT_META['setlist_progress'],     appliesTo: [
    ...M.MUSIC.items
  ]},

  // ───── Facilities & Venue (per area) ─────
  cleanliness_rating_area:{ ...STAT_META['cleanliness_rating_area'], appliesTo: 'ALL' },
  restroom_wait_area:   { ...STAT_META['restroom_wait_area'],   appliesTo: 'ALL' },
  accessibility_ok_area:{ ...STAT_META['accessibility_ok_area'], appliesTo: 'ALL' },
  lost_found_reports:   { ...STAT_META['lost_found_reports'],   appliesTo: [
    'festival','stadium','theme_park','expo','conference','museum','open_day','corporate_event','cinema','theater','market'
  ]},

  // ───────────── Network & Tech ─────────────
  wifi_quality:         { ...STAT_META['wifi_quality'],         appliesTo: [
    'conference','expo','coworking','lan_party','esports','open_day','corporate_event','meetup','demo_day'
  ]},
  wifi_connected_users: { ...STAT_META['wifi_connected_users'], appliesTo: [
    'conference','expo','coworking','lan_party','esports','open_day','corporate_event','meetup'
  ]},
  app_engagement_rate:  { ...STAT_META['app_engagement_rate'],  appliesTo: [
    'conference','expo','festival','open_day','esports','theme_park','stadium'
  ]},
  bandwidth_utilization:{ ...STAT_META['bandwidth_utilization'], appliesTo: [
    'lan_party','esports','coworking','conference','expo'
  ]},

  // ─────────── Safety & Compliance ───────────
  security_incidents:   { ...STAT_META['security_incidents'],   appliesTo: [
    ...M.SPORT.items,'festival','expo','theme_park','club','concert','market'
  ]},
  weather_index:        { ...STAT_META['weather_index'],        appliesTo: [
    'festival','marathon','food_festival','market','theme_park','stadium','open_day','concert','wedding'
  ]},

  // ─────────── Commerce & Merch ───────────
  merch_tx_per_min:     { ...STAT_META['merch_tx_per_min'],     appliesTo: [
    'concert','festival','stadium','esports','theme_park','expo','theater','book_fair'
  ]},

  // ───────────────── Mobility ────────────────
  parking_occupancy:    { ...STAT_META['parking_occupancy'],    appliesTo: [
    'stadium','expo','theme_park','food_festival','market','conference','open_day','wedding','cinema','theater'
  ]},
  shuttle_wait_time:    { ...STAT_META['shuttle_wait_time'],    appliesTo: [
    'stadium','marathon','expo','theme_park','open_day','festival'
  ]},
  arrival_peak_time:    { ...STAT_META['arrival_peak_time'],    appliesTo: [
    'stadium','marathon','expo','festival','open_day','concert','theater','cinema'
  ]},

  // ─── Engagement & Sentiment (esteso) ───
  sentiment_distribution:{ ...STAT_META['sentiment_distribution'], appliesTo: 'ALL' },
  rating_distribution:  { ...STAT_META['rating_distribution'],   appliesTo: 'ALL' },

  // ──────── Co-working / Hub (nicchia) ────────
  occupancy_pct:        { ...STAT_META['occupancy_pct'],        appliesTo: ['coworking'] },
  meeting_room_wait:    { ...STAT_META['meeting_room_wait'],    appliesTo: ['coworking'] },
  noise_level_mode:     { ...STAT_META['noise_level_mode'],     appliesTo: ['coworking'] },
  coffee_bar_queue:     { ...STAT_META['coffee_bar_queue'],     appliesTo: ['coworking'] },
  community_engagement: { ...STAT_META['community_engagement'], appliesTo: ['coworking'] },
  tickets_open_per_hour:{ ...STAT_META['tickets_open_per_hour'],appliesTo: ['coworking'] },
  satisfaction_index:   { ...STAT_META['satisfaction_index'],   appliesTo: ['coworking'] },

  // ───────────── Fitness / Wellness ─────────────
  room_crowding_pct:    { ...STAT_META['room_crowding_pct'],    appliesTo: ['wellness','conference','coworking'] },
  satisfaction_after_session:{ ...STAT_META['satisfaction_after_session'], appliesTo: ['wellness'] },

  // ───────────── eSports / Gaming ─────────────
  payments_mix_arena:   { ...STAT_META['payments_mix_arena'],   appliesTo: ['esports','lan_party'] },
  act_popularity_match: { ...STAT_META['act_popularity_match'], appliesTo: ['esports'] },

  // ───────────── Expo / Book Fair ─────────────
  avg_basket_value_book:{ ...STAT_META['avg_basket_value_book'], appliesTo: ['book_fair','expo','market'] },

  // ───────────── Sport / Stadium ─────────────
  match_excitement:     { ...STAT_META['match_excitement'],     appliesTo: ['stadium'] },
  gate_throughput:      { ...STAT_META['gate_throughput'],      appliesTo: ['stadium'] },
  crowding_gate_pct:    { ...STAT_META['crowding_gate_pct'],    appliesTo: ['stadium'] },

  // ─────── Festival multi-area (surrogato) ───────
  area_heatmap_crowding:{ ...STAT_META['area_heatmap_crowding'], appliesTo: ['festival','expo','theme_ark','stadium','market'].map(t => t === 'theme_ark' ? 'theme_park' : t) }
})

// (Opzionale) Alias per metriche parametriche
export const STAT_ALIASES: Record<string, string> = {
  'restroom_wait:area':         'restroom_wait',
  'area_crowding_pct:area':     'area_crowding_pct',
  'queue_wait_time:area':       'queue_wait_time',
  'food_stand_wait:stand':      'food_stand_wait',
  'act_popularity:session':     'act_popularity',
};


// ─────────────────────────────────────────────────────────────────────────────
// DESCRIZIONI EVENTO (schede statiche, non-live)
// ─────────────────────────────────────────────────────────────────────────────

export type DescriptionType =
  | 'basics'         // Info base: titolo, data/ora, location
  | 'program'        // Programma / line-up / attività
  | 'venue'          // Venue & ambienti
  | 'fnb'            // Food & Beverage
  | 'tickets'        // Biglietti / Prezzi / Policy
  | 'access'         // Accesso / Trasporti / Parcheggi
  | 'audience'       // Pubblico target / età
  | 'vibe'           // Mood / dress code / atmosfera
  | 'amenities'      // Servizi & Facilities (guardaroba, sedute, ecc.)
  | 'tech'           // Audio/Video/Luci/Connettività
  | 'safety'         // Sicurezza / policy oggetti / meteo
  | 'accessibility'  // Accessibilità
  | 'policies'       // Regole aggiuntive (foto, re-entry, animali, ecc.)
  ;

export type FieldDataType =
  | 'short_text'
  | 'long_text'
  | 'number'
  | 'percent'
  | 'boolean'
  | 'enum'
  | 'multi_enum'
  | 'time'
  | 'price'
  | 'url'
  | 'image'
  ;

export interface DescriptionFieldMeta {
  id: string;                 // es. 'doors_open_time'
  label: string;              // es. 'Apertura Porte'
  dataType: FieldDataType;    // es. 'time'
  hint?: string;
  // opzionale: enum / multi_enum
  options?: Array<{ value: string; label: string }>;
  // opzionale: componenti "semplici" già presenti (riuso dove sensato)
  inputComponent?: InputComponentKey | 'Text' | 'Textarea' | 'TimePicker' | 'PriceInput' | 'UrlInput' | 'ImageUploader';
}

// Catalogo campi per ogni tipologia descrittiva
export const DESCRIPTION_FIELDS: Record<DescriptionType, DescriptionFieldMeta[]> = {
  basics: [
    { id: 'subtitle',            label: 'Sottotitolo',        dataType: 'short_text', inputComponent: 'Text' },
    { id: 'doors_open_time',     label: 'Apertura Porte',     dataType: 'time',       inputComponent: 'TimePicker' },
    { id: 'start_time',          label: 'Orario Inizio',      dataType: 'time',       inputComponent: 'TimePicker' },
    { id: 'end_time',            label: 'Orario Fine',        dataType: 'time',       inputComponent: 'TimePicker' },
    { id: 'location_name',       label: 'Luogo / Venue',      dataType: 'short_text', inputComponent: 'Text' },
    { id: 'address',             label: 'Indirizzo',          dataType: 'short_text', inputComponent: 'Text' },
    { id: 'cover_image',         label: 'Immagine di Copertina', dataType: 'image',   inputComponent: 'ImageUploader' },
    { id: 'website',             label: 'Sito Ufficiale',     dataType: 'url',        inputComponent: 'UrlInput' },
  ],
  program: [
    { id: 'lineup',              label: 'Line-up / Programma', dataType: 'long_text', inputComponent: 'Textarea', hint: 'Ordine esibizioni / talk con orari' },
    { id: 'headliner',           label: 'Headliner',           dataType: 'short_text', inputComponent: 'Text' },
    { id: 'schedule_notes',      label: 'Note Programma',      dataType: 'long_text',  inputComponent: 'Textarea' },
  ],
  venue: [
    { id: 'indoor_outdoor',      label: 'Interno/Esterno',     dataType: 'enum', inputComponent: 'SegmentedControlComponent',
      options: [
        { value: 'indoor', label: 'Indoor' },
        { value: 'outdoor', label: 'Outdoor' },
        { value: 'mixed', label: 'Misto' },
      ],
    },
    { id: 'capacity_declared',   label: 'Capienza Dichiarata', dataType: 'number', inputComponent: 'RangeSliderComponent', hint: 'Numero indicativo posti' },
    { id: 'seating_type',        label: 'Tipologia Posti',     dataType: 'enum',   inputComponent: 'ChipSelectorComponent',
      options: [
        { value: 'standing', label: 'In piedi' },
        { value: 'seated',   label: 'Seduti' },
        { value: 'mixed',    label: 'Misto' },
      ],
    },
  ],
  fnb: [
    { id: 'fnb_available',       label: 'Food & Drink disponibili', dataType: 'boolean', inputComponent: 'ToggleSwitchComponent' },
    { id: 'fnb_options',         label: 'Opzioni F&B',               dataType: 'multi_enum', inputComponent: 'ChipSelectorComponent',
      options: [
        { value: 'bar',       label: 'Bar' },
        { value: 'cocktails', label: 'Cocktail' },
        { value: 'craft',     label: 'Birre artigianali' },
        { value: 'street',    label: 'Street food' },
        { value: 'vegan',     label: 'Veg/vegan' },
        { value: 'glutenfree',label: 'Gluten-free' },
      ],
    },
  ],
  tickets: [
    { id: 'ticket_required',     label: 'Biglietto richiesto', dataType: 'boolean', inputComponent: 'ToggleSwitchComponent' },
    { id: 'price_range',         label: 'Fascia Prezzo',       dataType: 'price',   inputComponent: 'PriceInput', hint: 'Esempio: 15–50€' },
    { id: 'age_policy',          label: 'Policy età',          dataType: 'enum',    inputComponent: 'ChipSelectorComponent',
      options: [
        { value: 'all',     label: 'Per tutti' },
        { value: '16+',     label: '16+' },
        { value: '18+',     label: '18+' },
        { value: '21+',     label: '21+' },
      ],
    },
    { id: 'reentry',             label: 'Re-entry consentito', dataType: 'boolean', inputComponent: 'ToggleSwitchComponent' },
  ],
  access: [
    { id: 'parking_info',        label: 'Parcheggio',          dataType: 'long_text', inputComponent: 'Textarea' },
    { id: 'public_transport',    label: 'Trasporti Pubblici',  dataType: 'long_text', inputComponent: 'Textarea' },
    { id: 'shuttle_info',        label: 'Navette',             dataType: 'long_text', inputComponent: 'Textarea' },
  ],
  audience: [
    { id: 'target_audience',     label: 'Pubblico target',     dataType: 'long_text', inputComponent: 'Textarea' },
    { id: 'estimated_attendance',label: 'Partecipanti attesi', dataType: 'number',    inputComponent: 'RangeSliderComponent' },
  ],
  vibe: [
    { id: 'music_genres',        label: 'Generi Musicali',     dataType: 'multi_enum', inputComponent: 'ChipSelectorComponent',
      options: [
        { value: 'house',    label: 'House' },
        { value: 'techno',   label: 'Techno' },
        { value: 'pop',      label: 'Pop' },
        { value: 'rock',     label: 'Rock' },
        { value: 'indie',    label: 'Indie' },
        { value: 'hiphop',   label: 'Hip-hop' },
        { value: 'classical',label: 'Classica' },
      ],
    },
    { id: 'dress_code',          label: 'Dress Code',          dataType: 'enum', inputComponent: 'SegmentedControlComponent',
      options: [
        { value: 'casual',   label: 'Casual' },
        { value: 'smart',    label: 'Smart' },
        { value: 'theme',    label: 'A tema' },
        { value: 'none',     label: 'Nessuno' },
      ],
    },
    { id: 'atmosphere_notes',    label: 'Note atmosfera',      dataType: 'long_text', inputComponent: 'Textarea' },
  ],
  amenities: [
    { id: 'cloakroom',           label: 'Guardaroba',          dataType: 'boolean', inputComponent: 'ToggleSwitchComponent' },
    { id: 'seating_availability',label: 'Posti a sedere',      dataType: 'enum',    inputComponent: 'ChipSelectorComponent',
      options: [
        { value: 'none',   label: 'Assenti' },
        { value: 'limited',label: 'Limitati' },
        { value: 'many',   label: 'Numerosi' },
      ],
    },
    { id: 'smoking_area',        label: 'Area Fumatori',       dataType: 'boolean', inputComponent: 'ToggleSwitchComponent' },
  ],
  tech: [
    { id: 'audio_setup',         label: 'Impianto Audio',      dataType: 'short_text', inputComponent: 'Text' },
    { id: 'video_lasers',        label: 'Video/Luci/Laser',    dataType: 'short_text', inputComponent: 'Text' },
    { id: 'connectivity',        label: 'Connettività',        dataType: 'enum', inputComponent: 'ChipSelectorComponent',
      options: [
        { value: 'none',    label: 'Nessuna' },
        { value: 'wifi',    label: 'Wi-Fi' },
        { value: '4g',      label: '4G' },
        { value: '5g',      label: '5G' },
      ],
    },
  ],
  safety: [
    { id: 'security_presence',   label: 'Presenza Sicurezza',  dataType: 'enum', inputComponent: 'SegmentedControlComponent',
      options: [
        { value: 'low',  label: 'Bassa' },
        { value: 'med',  label: 'Media' },
        { value: 'high', label: 'Alta' },
      ],
    },
    { id: 'prohibited_items',    label: 'Oggetti vietati',     dataType: 'long_text', inputComponent: 'Textarea' },
    { id: 'weather_plan',        label: 'Piano meteo',         dataType: 'long_text', inputComponent: 'Textarea' },
  ],
  accessibility: [
    { id: 'wheelchair_access',   label: 'Accesso sedia a rotelle', dataType: 'boolean', inputComponent: 'ToggleSwitchComponent' },
    { id: 'accessible_restroom', label: 'Bagno accessibile',        dataType: 'boolean', inputComponent: 'ToggleSwitchComponent' },
    { id: 'notes',               label: 'Note accessibilità',       dataType: 'long_text', inputComponent: 'Textarea' },
  ],
  policies: [
    { id: 'photo_policy',        label: 'Policy foto/video',   dataType: 'enum', inputComponent: 'ChipSelectorComponent',
      options: [
        { value: 'free',   label: 'Libera' },
        { value: 'limited',label: 'Limitata' },
        { value: 'ban',    label: 'Vietata' },
      ],
    },
    { id: 'pets_policy',         label: 'Animali',             dataType: 'enum', inputComponent: 'ChipSelectorComponent',
      options: [
        { value: 'no_pets', label: 'Non ammessi' },
        { value: 'guide',   label: 'Solo cani guida' },
        { value: 'pets_ok', label: 'Ammessi' },
      ],
    },
    { id: 'refund_policy',       label: 'Rimborsi',            dataType: 'long_text', inputComponent: 'Textarea' },
  ],
};

// Associazione tipologie descrittive → tipologie evento
export const EVENT_DESCRIPTIONS_MAP: Record<EventType, DescriptionType[]> = {
  club:           ['basics','program','vibe','venue','fnb','tickets','amenities','tech','access','safety','accessibility','policies'],
  concert:        ['basics','program','vibe','venue','tickets','access','amenities','tech','safety','accessibility','policies','fnb'],
  festival:       ['basics','program','vibe','venue','fnb','tickets','amenities','tech','access','safety','accessibility','policies'],
  conference:     ['basics','program','venue','tickets','amenities','tech','access','safety','accessibility','policies','audience','fnb'],
  expo:           ['basics','program','venue','tickets','amenities','tech','access','safety','accessibility','policies','fnb','audience'],
  theater:        ['basics','program','venue','tickets','access','amenities','safety','accessibility','policies'],
  cinema:         ['basics','program','venue','tickets','access','amenities','safety','accessibility','policies','fnb'],
  stadium:        ['basics','program','venue','tickets','access','safety','amenities','fnb','tech','accessibility','policies','audience'],
  marathon:       ['basics','program','access','safety','policies','amenities','audience','accessibility'],
  esports:        ['basics','program','tech','venue','tickets','amenities','access','safety','accessibility','policies','fnb','audience'],
  food_festival:  ['basics','program','fnb','venue','tickets','access','amenities','safety','accessibility','policies','audience'],
  market:         ['basics','program','fnb','venue','tickets','access','amenities','safety','accessibility','policies'],
  museum:         ['basics','program','venue','tickets','access','amenities','safety','accessibility','policies','audience'],
  theme_park:     ['basics','program','venue','tickets','access','amenities','safety','accessibility','policies','fnb'],
  wedding:        ['basics','program','venue','vibe','amenities','access','policies','fnb','accessibility'],
  open_day:       ['basics','program','venue','access','amenities','audience','safety','accessibility','policies'],
  charity_gala:   ['basics','program','venue','tickets','vibe','amenities','access','safety','accessibility','policies','audience'],
  coworking:      ['basics','venue','amenities','tech','access','policies','accessibility','audience'],
  meetup:         ['basics','program','venue','tickets','amenities','access','policies','audience'],
  wellness:       ['basics','program','venue','amenities','access','policies','safety','accessibility','audience'],
  book_fair:      ['basics','program','venue','tickets','access','amenities','fnb','safety','accessibility','policies','audience'],
  demo_day:       ['basics','program','venue','tickets','tech','amenities','access','safety','accessibility','policies','audience'],
  lan_party:      ['basics','program','tech','venue','tickets','amenities','access','safety','accessibility','policies','audience','fnb'],
  corporate_event:['basics','program','venue','tickets','amenities','access','tech','policies','safety','accessibility','audience'],
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper: descrizioni per evento
// ─────────────────────────────────────────────────────────────────────────────

export function getDescriptionTypesForEvent(eventType: EventType): DescriptionType[] {
  return EVENT_DESCRIPTIONS_MAP[eventType] ?? ['basics'];
}

export function getDescriptionFieldsForEvent(eventType: EventType): Array<{ type: DescriptionType; fields: DescriptionFieldMeta[] }> {
  const types = getDescriptionTypesForEvent(eventType);
  return types.map((t) => ({ type: t, fields: DESCRIPTION_FIELDS[t] ?? [] }));
}


// ─────────────────────────────────────────────────────────────────────────────
// Helper: ricavare cosa mostrare per una tipologia evento
// ─────────────────────────────────────────────────────────────────────────────
export function getStatsForEvent(
  eventType: EventType,
  selectedStatIds?: string[]
) {
  const entries = Object.entries(STAT_META)
    .filter(([id, meta]) => {
      const applies =
        meta.appliesTo === "ALL" ||
        (meta.appliesTo as EventType[]).includes(eventType);

      // Se viene passata una lista di selezionati, filtra anche per quelli
      const selectedOk = !selectedStatIds || selectedStatIds.includes(id);

      return applies && selectedOk;
    })
    .map(([id, meta]) => ({
      id,
      component: meta.uiComponent,
      selector: REGISTRY_COMPONENT_SELECTOR[meta.uiComponent],
      recommended: !!meta.recommendedFor?.includes(eventType),
    }));

  // Ordina: prima quelli raccomandati, poi alfabetico
  entries.sort((a, b) => Number(b.recommended) - Number(a.recommended) || a.id.localeCompare(b.id));
  return entries;
}

// Helper: dato statId → componente (fallback se non presente)
export function resolveComponentForStat(
  statId: string,
  fallbackByType?: DataType
): { component: UiComponentKey; selector: string } | null {
  const id = STAT_ALIASES[statId] ?? statId;
  const meta = STAT_META[id];
  if (meta) return { component: meta.uiComponent, selector: REGISTRY_COMPONENT_SELECTOR[meta.uiComponent] };
  if (fallbackByType) {
    const comp = DATATYPE_DEFAULTS[fallbackByType];
    return { component: comp, selector: REGISTRY_COMPONENT_SELECTOR[comp] };
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Base inputs minimi per ogni componente (sempre presenti)
// ─────────────────────────────────────────────────────────────────────────────
export interface BaseComponentInputs {
  eventId: string;
  statId: string;
}

// Normalizza il payload grezzo in chiavi "tipiche" per il componente UI.
// Non importiamo pickInputsForComponent qui per evitare cicli;
// il filtro finale lo farà il Carousel con pickInputsForComponent(this.componentKey, data).
function normalizePayloadForComponent(component: UiComponentKey, payload: any): Record<string, any> {
  if (payload == null) return {};

  switch (component) {
    case 'ProgressMetricCardComponent':
    case 'GaugeMetricCardComponent':
      if (typeof payload === 'number') return { value: payload };
      return typeof payload === 'object' ? payload : {};

    case 'BarRatingCardComponent':
    case 'CircleRatingCardComponent':
      if (typeof payload === 'number') return { value: payload, maxValue: 5, showFraction: true };
      return typeof payload === 'object' ? payload : {};

    case 'EnumPillCardComponent':
      if (typeof payload === 'string') return { selectedValue: payload };
      if (typeof payload === 'boolean') return { selectedValue: payload ? 'yes' : 'no' };
      return typeof payload === 'object' ? payload : {};

    case 'SparklineKpiCardComponent':
      if (Array.isArray(payload)) return { series: payload, value: payload[payload.length - 1] };
      return typeof payload === 'object' ? payload : {};

    case 'DonutChartCardComponent':
    case 'StackedProgressCardComponent':
      if (Array.isArray(payload)) return { segments: payload };
      if (typeof payload === 'object') {
        const segments = Object.entries(payload).map(([label, value]) => ({ label, value: Number(value) }));
        return { segments };
      }
      return {};

    case 'DiscreteHistogramCardComponent':
      if (Array.isArray(payload)) return { data: payload };
      return {};

    case 'MinimalTimelineCardComponent':
      if (Array.isArray(payload)) return { timeline: payload };
      return {};

    case 'RankingListCardComponent':
      if (Array.isArray(payload)) return { items: payload };
      return {};

    default:
      return typeof payload === 'object' ? payload : {};
  }
}

/**
 * Costruisce il pacchetto { component, selector, inputs } per una stat.
 * - Risolve il componente corretto dalla mappa (o fallback).
 * - Aggiunge sempre { eventId, statId }.
 * - Normalizza il payload per quel componente (value/segments/series/...).
 * Il filtro finale degli @Input permessi viene fatto nel Carousel via pickInputsForComponent.
 */
export function buildInputsFor(
  statId: string,
  payload: any,
  ctx: { eventId: string }
): { component: UiComponentKey; selector: string; inputs: BaseComponentInputs & Record<string, any> } {
  // 1️⃣ Risolvi il componente da STAT_META o fallback
  const resolved =
    resolveComponentForStat(statId) ?? {
      component: DATATYPE_DEFAULTS.number,
      selector: REGISTRY_COMPONENT_SELECTOR[DATATYPE_DEFAULTS.number],
    };

  const component = resolved.component;
  const selector = resolved.selector;

  // 2️⃣ Base inputs sempre presenti
  const base: BaseComponentInputs = {
    eventId: ctx.eventId,
    statId,
  };

  // 3️⃣ Recupera metadati (label, unit, ecc.) da STAT_META
  const meta = STAT_META[statId];
  const staticDefaults: Record<string, any> = {};

  if (meta?.label) staticDefaults['title'] = meta.label;
  if (meta?.icon) staticDefaults['icon'] = meta.icon;
  if (meta?.unit) staticDefaults['unit'] = meta.unit;

  // fallback automatico per l’unità se non definita
  if (!staticDefaults['unit']) {
    if (statId.includes("pct") || statId.includes("utilization")) staticDefaults['unit'] = "%";
    else if (statId.includes("value") || statId.includes("price")) staticDefaults['unit'] = "€";
    else if (statId.includes("time")) staticDefaults['unit'] = "min";
    else staticDefaults['unit'] = "";
  }

  // 4️⃣ Normalizza il payload (es. numero, array, object)
  const normalized = normalizePayloadForComponent(component, payload);

  // 5️⃣ Unisci tutto (payload + meta + base)
  const merged = {
    ...staticDefaults,
    ...normalized,
    ...base,
  };

  // 6️⃣ Filtra solo gli @Input accettati dal componente
  const filtered = pickInputsForComponent(component, merged);

  // 7️⃣ Restituisci pacchetto finale
  return {
    component,
    selector,
    inputs: filtered as BaseComponentInputs & Record<string, any>,
  };
}



export type ComponentInputsMap = Partial<Record<UiComponentKey, ReadonlyArray<string>>>

export const UI_COMPONENT_INPUTS: ComponentInputsMap = {
  BarRatingCardComponent:        ['title','icon','value','maxValue','showFraction','eventId','statId'],
  CircleRatingCardComponent:     ['title','icon','value','maxValue','showFraction','eventId','statId'],
  DiscreteHistogramCardComponent:['title','data','showMenu','maxHeight','eventId','statId'],
  DonutChartCardComponent:       ['title','segments','centerText','centerSubtext','showMenu','eventId','statId'],
  EnumPillCardComponent:         ['title','icon','options','selectedValue','allowDeselect','eventId','statId'],
  ProgressMetricCardComponent:   ['eventId', 'statId', 'title', 'icon', 'value', 'unit', 'maxValue', 'showGradient',],
  StackedProgressCardComponent:  ['title','segments','showMenu','unit','eventId','statId'],
  GaugeMetricCardComponent:      ['title','value','min','max','unit','showMenu','eventId','statId'],
  MinimalTimelineCardComponent:  ['title','timeline','showMenu','eventId','statId'],
  RankingListCardComponent:      ['title','items','showMenu','eventId','statId'],
  SparklineKpiCardComponent:     ['title','series','unit','showMenu','value','eventId','statId'],
}

export function pickInputsForComponent(
  component: UiComponentKey,
  raw: Record<string, any>
): Record<string, any> {
  const allowed = new Set(UI_COMPONENT_INPUTS[component] ?? []);
  if (!allowed.size) return {};

  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (allowed.has(k)) out[k] = v;
  }

  switch (component) {
    // ─────────────────────────────
    // ✅ Sparkline KPI Card
    // ─────────────────────────────
    case "SparklineKpiCardComponent":
      return {
        data: {
          title: out['title'] ?? "KPI Live",
          value: out['value'] ?? 0,
          unit: out['unit'] ?? "%",
          trend: out['trend'] ?? {
            value: Math.floor(Math.random() * 10) - 5, // variazione casuale
            direction: Math.random() > 0.5 ? "up" : "down",
          },
          sparklineData:
            out['sparklineData'] ??
            out['series'] ??
            Array.from({ length: 10 }, () => ({
              value: Math.floor(Math.random() * 100),
            })),
          icon: out['icon'] ?? "trending-up-outline",
        },
        eventId: out['eventId'],
        statId: out['statId'],
      };

    case "ProgressMetricCardComponent":
      return {
        eventId: out['eventId'],
        statId: out['statId'],
        title: out['title'] ?? "Capienza",
        icon: out['icon'] ?? "speedometer-outline",
        value: out['value'] ?? 85,
        unit: out['unit'] ?? "%",
        maxValue: out['maxValue'] ?? 100,
        showGradient: out['showGradient'] ?? true,
      };

      case "BarRatingCardComponent":
        return {
          eventId: out['eventId'],
          statId: out['statId'],
          title: out['title'] ?? "Soddisfazione Clienti",
          icon: out['icon'] ?? "star-outline",
          value: out['value'] ?? 4,
          maxValue: out['maxValue'] ?? 5,
          showFraction: out['showFraction'] ?? true,
        };

      case "DonutChartCardComponent":
        const demoSegments = [
          { label: "A", value: 40, color: "#8B5CF6" },
          { label: "B", value: 30, color: "#10B981" },
          { label: "C", value: 20, color: "#F59E0B" },
          { label: "D", value: 10, color: "#EF4444" },
        ]

        return {
          eventId: out['eventId'],
          statId: out['statId'],
          title: out['title'] ?? "Distribuzione Partecipanti",
          segments: out['segments'] ?? demoSegments,
          centerText:
            out['centerText'] ??
            `${demoSegments.reduce((sum, s) => sum + s.value, 0)}%`,
          centerSubtext: out['centerSubtext'] ?? "Totale",
          showMenu: out['showMenu'] ?? true,
        }
      case "EnumPillCardComponent":
        const demoOptions = [
          { value: "low", label: "Bassa", icon: "" },
          { value: "medium", label: "Media", icon: "" },
          { value: "high", label: "Alta", icon: "" },
        ]
        return {
          eventId: out['eventId'],
          statId: out['statId'],
          title: out['title'] ?? "Livello Attività",
          icon: out['icon'] ?? "options-outline",
          options: out['options'] ?? demoOptions,
          selectedValue: out['selectedValue'] ?? "medium",
          allowDeselect: out['allowDeselect'] ?? true,
        }
      case "StackedProgressCardComponent":
        // Se non arrivano segmenti reali, creiamo dei segmenti demo
        const demoSegments2 = [
          { label: "Positivo", value: 60, color: "#10B981", glowColor: "#6EE7B7" },
          { label: "Neutro", value: 25, color: "#F59E0B", glowColor: "#FCD34D" },
          { label: "Negativo", value: 15, color: "#EF4444", glowColor: "#FCA5A5" },
        ];
        return {
          eventId: out['eventId'],
          statId: out['statId'],
          title: out['title'] ?? "Distribuzione Sentiment",
          segments: out['segments'] ?? demoSegments2,
          showMenu: out['showMenu'] ?? true,
          unit: out['unit'] ?? "%",
        };
      case "MinimalTimelineCardComponent":
        const demoTimelineData = {
          points: out['points'] ?? [
            { label: "Creazione", position: 10, color: "green" },
            { label: "Check-in", position: 35, color: "amber" },
            { label: "Inizio", position: 60, color: "primary" },
            { label: "Fine", position: 85, color: "muted" },
          ],
          currentTimePercent: out['currentTimePercent'] ?? 50,
          currentTimeLabel: out['currentTimeLabel'] ?? "Ora corrente",
        }

        return {
          eventId: out['eventId'],
          statId: out['statId'],
          data: demoTimelineData,
        }

      case "RankingListCardComponent":
        const demoItems = [
          { name: "Area A", value: 86 },
          { name: "Area B", value: 72 },
          { name: "Area C", value: 55 },
          { name: "Area D", value: 40 },
          { name: "Area E", value: 20 },
        ]

        return {
          eventId: out['eventId'],
          statId: out['statId'],
          title: out['title'] ?? "Ranking Aree",
          items: out['items'] ?? demoItems,
          showMenuIcon: out['showMenuIcon'] ?? true,
        }


    default:
      return out;
  }
}
