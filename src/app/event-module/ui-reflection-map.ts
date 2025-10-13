// ─────────────────────────────────────────────────────────────────────────────
// Component → Inputs (whitelist) + helpers
// ─────────────────────────────────────────────────────────────────────────────

import { UiComponentKey } from "./stat-visual-map";

export type ComponentInputsMap = Partial<Record<UiComponentKey, ReadonlyArray<string>>>;

/**
 * Lista degli @Input accettati da ciascun componente UI.
 * (Derivata dai sorgenti che mi hai passato. Per i componenti non inclusi,
 * puoi aggiungere/rifinire le chiavi quando definisci le loro API).
 */
export const UI_COMPONENT_INPUTS: ComponentInputsMap = {
  // ───────── Rating (barre/circoli) ─────────
  BarRatingCardComponent: [
    'title', 'icon', 'value', 'maxValue', 'showFraction',
    'eventId', 'statId',
  ],
  CircleRatingCardComponent: [
    'title', 'icon', 'value', 'maxValue', 'showFraction',
    'eventId', 'statId',
  ],

  // ───────── Distribuzioni / Donut ─────────
  DiscreteHistogramCardComponent: [
    'title', 'data', 'showMenu', 'maxHeight',
    'eventId', 'statId',
  ],
  DonutChartCardComponent: [
    'title', 'segments', 'centerText', 'centerSubtext', 'showMenu',
    'eventId', 'statId',
  ],

  // ───────── Enum (pill) ─────────
  EnumPillCardComponent: [
    'title', 'icon', 'options', 'selectedValue', 'allowDeselect',
    'eventId', 'statId',
  ],

  // ───────── Progress singolo / stacked ─────────
  ProgressMetricCardComponent: [
    // ⚠️ Al momento nel codice sono @Input solo eventId e statId.
    // Consiglio: aggiungi @Input anche per questi per abilitarne il binding dinamico.
    'eventId', 'statId',
    // 'title','icon','value','unit','maxValue','showGradient' // (dopo la patch)
  ],
  StackedProgressCardComponent: [
    'title', 'segments', 'showMenu', 'unit',
    'eventId', 'statId',
  ],

  // ───────── Placeholder (raffina quando definisci i componenti) ─────────
  GaugeMetricCardComponent: [
    // ipotesi comuni per gauge:
    'title','value','min','max','unit','showMenu',
    'eventId','statId',
  ],
  MinimalTimelineCardComponent: [
    // ipotesi comuni per timeline:
    'title','timeline','showMenu',
    'eventId','statId',
  ],
  RankingListCardComponent: [
    // ipotesi comuni per ranking:
    'title','items','showMenu',
    'eventId','statId',
  ],
  SparklineKpiCardComponent: [
    // ipotesi comuni per sparkline:
    'title','series','unit','showMenu','value',
    'eventId','statId',
  ]
};

/** Filtra un oggetto “grezzo” trattenendo solo gli @Input supportati dal componente */
export function pickInputsForComponent(
  component: UiComponentKey,
  raw: Record<string, any>
): Record<string, any> {
  const allowed = new Set(UI_COMPONENT_INPUTS[component] ?? []);
  if (!allowed.size) return {}; // nessun input dichiarato → evito di passare roba a caso
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (allowed.has(k)) out[k] = v;
  }
  return out;
}

/**
 * Utility comoda: merge di default + valori correnti, poi filtro sugli input permessi.
 * Passa `defaultsPerComponent[component]` se vuoi valori di fallback eleganti.
 */
export function buildInputsForComponent(
  component: UiComponentKey,
  current: Record<string, any>,
  defaults?: Record<string, any>
): Record<string, any> {
  return pickInputsForComponent(component, { ...(defaults ?? {}), ...current });
}
