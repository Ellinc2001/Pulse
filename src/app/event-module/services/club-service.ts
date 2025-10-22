import { Injectable, Type } from '@angular/core'
import { StatMeta } from '../stat-visual-map'
import { UiComponentKey, UI_COMPONENT_INPUTS, InputComponentKey, REGISTRY_INPUT_COMPONENT_SELECTOR, INPUT_COMPONENT_INPUTS } from '../ui-reflection-map'
import { REGISTRY_COMPONENT_TYPE } from '../ui-reflection-map'  // <-- mappa dei Type
import { CarouselConfig } from '../carousel/carousel'
import { StatsProvider } from './stats-provider'
import { InputSlide } from '../input-context-carousel/input-context-carousel'

type InputCarouselVM = {
  componentKey: InputComponentKey;
  items: InputSlide[];
  config: {
    slidesPerView?: number; spaceBetween?: number;
    autoplay?: boolean; autoplayDelay?: number;
    showNavigation?: boolean; showPagination?: boolean;
  };
};


export const STAT_META_CLUB: Record<string, StatMeta> = {
  queue_wait_time_now: {
    label: "Tempo in coda per l'ingresso",
    group: 'Ingresso',
    uiComponent: 'WaitTimePillsComponent',
    inputComponent: 'ChipSelectorComponent',
    unit: 'min',
  },
  capacity_utilization_now: {
    label: 'Capienza occupata',
    group: 'Ingresso',
    uiComponent: 'ProgressMetricCardComponent',
    inputComponent: null,
    unit: '%',
  },
  vibe_dancefloor_now: {
    label: 'Vibe del dancefloor',
    group: 'Dancefloor & Vibe',
    uiComponent: 'EnumPillCardComponent',
    inputComponent: 'SegmentedControlComponent',
    options: [
      { value: 'low', label: 'Bassa' },
      { value: 'med', label: 'Media' },
      { value: 'high', label: 'Alta' },
      { value: 'fire', label: '🔥' },
    ],
  },
  sound_quality_now: {
    label: 'Qualità audio',
    group: 'Dancefloor & Vibe',
    uiComponent: 'BarRatingCardComponent',
    inputComponent: 'RatingCirclesComponent',
    unit: '★',
  },
  act_popularity_now: {
    label: 'Gradimento DJ / set',
    group: 'Dancefloor & Vibe',
    uiComponent: 'BarRatingCardComponent',
    inputComponent: 'RatingCirclesComponent',
    unit: '★',
  },
  bar_wait_time_now: {
    label: 'Coda al bar',
    group: 'Bar & Servizi',
    uiComponent: 'WaitTimePillsComponent',
    inputComponent: 'ChipSelectorComponent',
    unit: 'min',
  },
  drink_quality_now: {
    label: 'Qualità drink',
    group: 'Bar & Servizi',
    uiComponent: 'BarRatingCardComponent',
    inputComponent: 'RatingCirclesComponent',
    unit: '★',
  },
  temperature_comfort_now: {
    label: 'Temperatura percepita',
    group: 'Comfort & Sicurezza',
    uiComponent: 'EnumPillCardComponent',
    inputComponent: 'SegmentedControlComponent',
    options: [
      { value: 'cold',  label: 'Freddo 🥶' },
      { value: 'ok',    label: 'OK 🙂' },
      { value: 'warm',  label: 'Caldo 🥵' }
    ]
  }
}
// services/club-service.ts
@Injectable({ providedIn: 'root' })
export class ClubService implements StatsProvider  {
  constructor()  {}

  getCarouselsForClub(eventId = 'club-demo') {
    const grouped: Partial<Record<UiComponentKey, any[]>> = {}

    for (const [statId, meta] of Object.entries(STAT_META_CLUB)) {
      const key = meta.uiComponent as UiComponentKey
      if (!grouped[key]) grouped[key] = []

      const allowed = UI_COMPONENT_INPUTS[key] || []
      const data: Record<string, any> = {}

      // ---- base sempre presenti se previsti ----
      if (allowed.includes('eventId')) data['eventId'] = eventId
      if (allowed.includes('statId'))  data['statId']  = statId
      if (allowed.includes('title'))   data['title']   = meta.label
      if (allowed.includes('unit') && meta.unit) data['unit'] = meta.unit
      if (allowed.includes('showMenu')) data['showMenu'] = true

      // ---- altri input generici ----
      for (const input of allowed) {
        if (input === 'value') data['value'] = this.mockValue(meta)
        if (input === 'options' && (meta as any).options) data['options'] = (meta as any).options
        if (input === 'segments' && statId === 'sentiment_share_now') data['segments'] = this.mockSegments()
        if (input === 'items' && statId === 'area_crowding_ranking_now') data['items'] = this.mockRankingItems()
        if (input === 'series') data['series'] = this.mockSeries()
        if (input === 'min' && key === 'GaugeMetricCardComponent') data['min'] = 0
        if (input === 'max' && key === 'GaugeMetricCardComponent') data['max'] = 60
        if (input === 'showGradient' && key === 'ProgressMetricCardComponent') data['showGradient'] = true
        if (key === 'WaitTimePillsComponent' && input === 'waitTime') {
          data['waitTime'] = this.mockSingleWaitTime(statId, meta)
        }
      }

      // ---- FIX specifico per BarRating (fallback sicuro) ----
      if (key === 'BarRatingCardComponent') {
        // forza intero 1..5 per evitare falsi “vuoti”
        // forza intero 1..5 per evitare falsi “vuoti”
        data['value'] = this.mockRating()                      
        data['maxValue'] ??= 5
        data['showFraction'] ??= true
        data['icon'] ??= 'star'
      }

      grouped[key]!.push(data)
    }


    return Object.entries(grouped)
      .map(([key, dataList]) => {
        const componentKey = key as UiComponentKey
        const componentType = REGISTRY_COMPONENT_TYPE[componentKey] as Type<any> | undefined
        if (!componentType) return null
        return {
          key: componentKey,
          title: this.resolveCarouselTitle(componentKey),
          componentKey,
          componentType,
          dataList,
          config: this.defaultCarouselConfig(),
        }
      })
      .filter(Boolean) as any[]
  }

  private defaultCarouselConfig(): CarouselConfig {
    return {
      slidesPerView: 1.2,
      spaceBetween: 16,
      autoplay: false,
      autoplayDelay: 3000,
      showNavigation: true,
      showPagination: true,
    }
  }

  // ── mock helpers ─────────────────────────────────────────
  private mockValue(meta: StatMeta) {
    if (meta.unit === '%') return Math.floor(Math.random() * 100)
    if (meta.unit === 'min') return Math.floor(Math.random() * 25)
    if (meta.unit === '★') return Number((Math.random() * 5).toFixed(1))
    return Math.floor(Math.random() * 10)
  }

  private mockSegments() {
    return [
      { label: 'Positivo', value: 62 },
      { label: 'Neutro', value: 23 },
      { label: 'Negativo', value: 15 },
    ]
  }

  private mockRankingItems() {
    return [
      { label: 'Dancefloor', value: 82 },
      { label: 'Bar', value: 67 },
      { label: 'VIP', value: 49 },
    ]
  }

  private mockSeries() {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
  }

  private mockSingleWaitTime(statId: string, meta: StatMeta) {
    const base = statId === 'bar_wait_time_now' ? 3 : 6
    const spread = statId === 'bar_wait_time_now' ? 6 : 8
    const minutes = base + Math.floor(Math.random() * spread)

    const color = minutes <= 5 ? 'green' : minutes <= 9 ? 'amber' : 'red'
    const icon  = statId === 'bar_wait_time_now' ? 'beer-outline' : 'enter-outline'

    return {
      queueName: meta.label || (statId === 'bar_wait_time_now' ? 'Coda bar' : 'Coda ingresso'),
      waitTime: `${minutes} min`,
      color,
      icon,
    }
  }



  private resolveCarouselTitle(key: UiComponentKey): string {
    const map: Partial<Record<UiComponentKey, string>> = {
      ProgressMetricCardComponent: 'Andamento Live',
      WaitTimePillsComponent: 'Tempi di Attesa',
      EnumPillCardComponent: 'Mood & Sensazioni',
      BarRatingCardComponent: 'Valutazioni in Tempo Reale',
      GaugeMetricCardComponent: 'Tempi & Code',
      RankingListCardComponent: 'Classifiche Live',
      StackedProgressCardComponent: 'Sentiment Pubblico',
      SparklineKpiCardComponent: 'Trend Live',
    }
    return map[key] || key
  }

  private mockRating(): number {
    return Math.floor(Math.random() * 5) + 1; // 1..5
  }

  getStatsMeta(): Record<string, StatMeta> {
    return STAT_META_CLUB;
  }


  getInputCarouselsForClub(eventId = 'club-demo'): InputCarouselVM[] {
    const byType = new Map<InputComponentKey, InputSlide[]>();

    Object.entries(STAT_META_CLUB).forEach(([statId, meta]) => {
      const key = meta.inputComponent as InputComponentKey | null | undefined;
      if (!key) return;

      const inputs = this.buildInputsForInputComponent(key, statId, meta, eventId);
      const slide: InputSlide = (inputs && Object.keys(inputs).length)
        ? { key, inputs }
        : key;

      const list = byType.get(key) ?? [];
      list.push(slide);
      byType.set(key, list);
    });

    // ⬇️ AGGIUNTA: crea e inserisci le slide della UserRatingCard
    const userRatingSlides = this.buildUserRatingSlides(eventId);
    if (userRatingSlides.length) {
      byType.set('UserRatingCardComponent', userRatingSlides);
    }

    const ORDER: InputComponentKey[] = [
      'ChipSelectorComponent',
      'IconButtonGroupComponent',
      'RangeSliderComponent',
      'RatingCirclesComponent',
      'IconRatingComponent',
      'SegmentedControlComponent',
      'ToggleSwitchComponent',
      'UserRatingCardComponent', // resta in coda o spostalo dove preferisci
    ];

    return Array.from(byType.entries())
      .sort((a, b) => ORDER.indexOf(a[0]) - ORDER.indexOf(b[0]))
      .map(([componentKey, items]) => ({
        componentKey,
        items,
        config: { slidesPerView: 1.2, spaceBetween: 16, showPagination: true, showNavigation: true },
      }));
  }

  /** Costruisce gli input ammessi per il componente, *filtrando* tramite INPUT_COMPONENT_INPUTS */
  private buildInputsForInputComponent(
    key: InputComponentKey,
    statId: string,
    meta: StatMeta,
    eventId: string
  ): Record<string, any> {
    const allowed = INPUT_COMPONENT_INPUTS[key] ?? [];
    const out: Record<string, any> = {};
    const label = meta.label;

    // title/label (solo se previsti dal componente)
    if (allowed.includes('title')) out['title'] = label;
    if (allowed.includes('label')) out['label'] = label;

    // options (SegmentedControl, ChipSelector, IconButtonGroup…)
    const options = (meta as any).options as Array<{ value: string; label: string }> | undefined;
    if (allowed.includes('options') && options?.length) {
      out['options'] = options;
    }

    // value: default coerenti per i vari componenti (solo se ammesso)
    if (allowed.includes('value')) {
      if (key === 'SegmentedControlComponent') {
        // default: prima opzione se presente
        // default: prima opzione se presente
        out['value'] = options?.[0]?.value ?? '';
      } else if (key === 'IconRatingComponent' || key === 'RatingCirclesComponent') {
        out['value'] = this.mockRating(); // 1..5
      } else if (key === 'RangeSliderComponent') {
        // usa i default del componente (min=1,max=5) ma diamo un value centrale
        // usa i default del componente (min=1,max=5) ma diamo un value centrale
        out['value'] = 3;
      } else {
        out['value'] = '';
      }
    }

    // parametri numeric/visual opzionali (solo se ammessi)
    if (key === 'IconRatingComponent' && allowed.includes('max')) out['max'] = 5;
    if (key === 'RatingCirclesComponent' && allowed.includes('max')) out['max'] = 5;

    // eventId/statId SOLO se previsti dalla mappa
    if (allowed.includes('eventId')) out['eventId'] = eventId;
    if (allowed.includes('statId'))  out['statId']  = statId;

    // ChipSelector: se non passiamo options, il componente usa i suoi preset minuti.
    // (Se vuoi forzare opzioni minute in base a meta.unit === 'min', qui è il posto giusto.)

    return out;
  }


  private getUsersToRate(eventId: string) {
    return [
      { id: 'u1', name: 'Luca Bianchi', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'u2', name: 'Sara Neri',   avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'u3', name: 'Marco Verdi', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ];
  }

  private buildUserRatingSlides(eventId: string): InputSlide[] {
    return this.getUsersToRate(eventId).map(u => ({
      key: 'UserRatingCardComponent',
      inputs: {
        userName: u.name,
        userAvatar: u.avatar,
      },
    }));
  }

}
