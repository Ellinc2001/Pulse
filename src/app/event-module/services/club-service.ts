import { Injectable, Type } from '@angular/core'
import { StatMeta } from '../stat-visual-map'
import { UiComponentKey, UI_COMPONENT_INPUTS } from '../ui-reflection-map'
import { REGISTRY_COMPONENT_TYPE } from '../ui-reflection-map'  // <-- mappa dei Type
import { CarouselConfig } from '../carousel/carousel'
import { StatsProvider } from './stats-provider'

export const STAT_META_CLUB: Record<string, StatMeta> = {
  queue_wait_time_now: {
    label: "Tempo in coda per l'ingresso",
    group: 'Ingresso',
    uiComponent: 'WaitTimePillsComponent',
    inputComponent: 'RangeSliderComponent',
    unit: 'min',
  },
  capacity_utilization_now: {
    label: 'Capienza occupata',
    group: 'Ingresso',
    uiComponent: 'ProgressMetricCardComponent',
    inputComponent: 'RangeSliderComponent',
    unit: '%',
  },
  vibe_dancefloor_now: {
    label: 'Vibe del dancefloor',
    group: 'Dancefloor & Vibe',
    uiComponent: 'EnumPillCardComponent',
    inputComponent: 'ChipSelectorComponent',
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
    inputComponent: 'RangeSliderComponent',
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
    inputComponent: 'ChipSelectorComponent',
  },
  sentiment_share_now: {
    label: 'Sentiment pubblico',
    group: 'Social Proof',
    uiComponent: 'StackedProgressCardComponent',
    inputComponent: 'ChipSelectorComponent',
    unit: '%',
  },
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

}
