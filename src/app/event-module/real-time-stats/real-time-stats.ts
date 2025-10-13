import { Component, type OnInit, type Type } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

// 🔑 import SOLO dagli helper e mappe che ci hai dato
import {
  type EventType,
  type UiComponentKey,
  getStatsForEvent,          // ← statistiche applicabili a un eventType
  buildInputsFor,            // ← assemblatore di input (statici + payload)
  REGISTRY_COMPONENT_SELECTOR, // (opzionale: debug)
  type BaseComponentInputs,
  STAT_META,
} from "../stat-visual-map";

// 👇 aggiungi qui le import reali dei tuoi componenti UI disponibili
import { ProgressMetricCardComponent } from "../ui-statistics-module/progress-metric-card/progress-metric-card";
import { SparklineKpiCardComponent } from "../ui-statistics-module/sparkline-kpi-card/sparkline-kpi-card";
import { BarRatingCardComponent } from "../ui-statistics-module/bar-rating-card/bar-rating-card";
import { DonutChartCardComponent } from "../ui-statistics-module/donut-chart-card/donut-chart-card"; 
import { CircleRatingCardComponent } from "../ui-statistics-module/circle-rating-card/circle-rating-card";
import { GaugeMetricCardComponent } from "../ui-statistics-module/gauge-metric-card/gauge-metric-card";
import { EnumPillCardComponent } from "../ui-statistics-module/enum-pill-card/enum-pill-card";
import { StackedProgressCardComponent } from "../ui-statistics-module/stacked-progress-card/stacked-progress-card";
import { MinimalTimelineCardComponent } from "../ui-statistics-module/minimal-timeline-card/minimal-timeline-card";
import { RankingListCardComponent } from "../ui-statistics-module/ranking-list-card/ranking-list-card";
import { WaitTimePillsComponent } from "../wait-time-pills/wait-time-pills";
// import { EnumPillCardComponent } from "...";
// import { GaugeMetricCardComponent } from "...";
// import { MinimalTimelineCardComponent } from "...";
// import { RankingListCardComponent } from "...";
// import { SparklineKpiCardComponent } from "...";
// import { StackedProgressCardComponent } from "...";

type CarouselItem = BaseComponentInputs & Record<string, any>;
type CarouselGroup = {
  key: UiComponentKey;
  title: string;
  componentType: Type<any>;
  dataList: CarouselItem[];
};

@Component({
  selector: "app-real-time-stats",
  templateUrl: "./real-time-stats.html",
  styleUrls: ["./real-time-stats.scss"],
  standalone: false,
})
export class RealTimeStatsComponent implements OnInit {
  // Dalla navigation mi aspetto almeno id e (idealmente) eventType
  event: { id: string; title?: string; type?: EventType } | null = null;

  userSelectedStats: string[] = Object.entries(STAT_META)
    .filter(([_, meta]) =>
      ["WaitTimePillsComponent","RankingListCardComponent","MinimalTimelineCardComponent","ProgressMetricCardComponent", "SparklineKpiCardComponent", "BarRatingCardComponent", "DonutChartCardComponent", "CircleRatingCardComponent", "EnumPillCardComponent"].includes(meta.uiComponent)
    )
    .map(([id]) => id);

  // fallback per demo/local
  private readonly fallbackEventId = "evt_12345_demo";
  private readonly fallbackEventType: EventType = "club";

  carousels: CarouselGroup[] = [];

  // Config del carosello (passata al figlio <app-component-carousel>)
  carouselConfig = {
    slidesPerView: 1.2,
    spaceBetween: 16,
    showNavigation: true,
    showPagination: true,
  };

  // Registry: mappa UiComponentKey → classe Angular
  // Aggiungi qui SOLO i componenti che esistono nel tuo progetto.
  private componentClassRegistry: Partial<Record<UiComponentKey, Type<any>>> = {
    ProgressMetricCardComponent: ProgressMetricCardComponent,
    BarRatingCardComponent: BarRatingCardComponent,
    CircleRatingCardComponent: CircleRatingCardComponent,
    // DiscreteHistogramCardComponent: DiscreteHistogramCardComponent,
    DonutChartCardComponent: DonutChartCardComponent,
    EnumPillCardComponent: EnumPillCardComponent,
    GaugeMetricCardComponent: GaugeMetricCardComponent,
    MinimalTimelineCardComponent: MinimalTimelineCardComponent,
    RankingListCardComponent: RankingListCardComponent,
    SparklineKpiCardComponent: SparklineKpiCardComponent,
    StackedProgressCardComponent: StackedProgressCardComponent,
    WaitTimePillsComponent: WaitTimePillsComponent,
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = (nav?.extras?.state as any) ?? history.state ?? {};
    this.event = state?.event ?? null;

    const eventType = this.resolvedEventType;
    this.carousels = this.buildCarouselsForEvent(eventType);

    // Debug non invasivo
    console.log("[stats] event:", this.event);
    console.log("[stats] eventType:", eventType);
    console.log("[stats] carousels:", this.carousels);
  }

  // ──────────────────────────────────────────────
  // GETTERS comodi
  // ──────────────────────────────────────────────
  get resolvedEventId(): string {
    return this.event?.id ?? this.fallbackEventId;
  }
  get resolvedEventType(): EventType {
    return (this.event?.type as EventType) ?? this.fallbackEventType;
  }

  // ──────────────────────────────────────────────
  // NAV
  // ──────────────────────────────────────────────
  back() {
    this.router.navigate(["/event-detail", this.event?.id]);
  }
  close() {
    this.router.navigate(["/events"]);
  }

  // ──────────────────────────────────────────────
  // ENTRYPOINT: costruisce TUTTI i caroselli per una tipologia evento
  // ──────────────────────────────────────────────
  buildCarouselsForEvent(eventType: EventType): CarouselGroup[] {
    // 1) quali statistiche sono applicabili a questa tipologia?
  const applicable = getStatsForEvent(eventType, this.userSelectedStats);
    // struttura: [{ id, component, selector, recommended }, ...]

    // 2) raggruppo per componente UI
    const byComponent = new Map<UiComponentKey, string[]>();
    for (const { id, component } of applicable) {
      if (!byComponent.has(component)) byComponent.set(component, []);
      byComponent.get(component)!.push(id);
    }

    // 3) per ogni componente, genero il dataList per il carosello
    const out: CarouselGroup[] = [];
    for (const [key, statIds] of byComponent.entries()) {
      const cmpClass = this.componentClassRegistry[key];
      if (!cmpClass) {
        console.warn(
          `[stats] componente UI non registrato: ${key} → selector=${REGISTRY_COMPONENT_SELECTOR[key]}. ` +
          `Skippato il carosello (aggiungi la classe al registry).`
        );
        continue;
      }

      const dataList: CarouselItem[] = statIds.map((statId) => {
        // 3a) prendo il payload live (demo/stub qui)
        const payload = this.fetchLivePayload(statId);
        // 3b) costruisco gli input FINALI usando la tua factory
        //     → comprende label/unit/static già dentro la stat-visual-map
        const built = buildInputsFor(statId, payload, {
          eventId: this.resolvedEventId,
        });
        // built = { component, inputs }
        return built.inputs as CarouselItem;
      });

      // 4) titolo del carosello: “Statistiche Live” o friendly dal nome componente
      const title = this.humanizeComponentTitle(key);

      out.push({
        key,
        title,
        componentType: cmpClass,
        dataList,
      });
    }

    // 5) ordino i caroselli per consistenza UI (facoltativo)
    out.sort((a, b) => a.key.localeCompare(b.key));
    return out;
  }

  // ──────────────────────────────────────────────
  // Stub: payload live per singola stat (sostituisci con la tua sorgente)
  // ──────────────────────────────────────────────
  private fetchLivePayload(statId: string): any {
    // Qui puoi collegarti al tuo store / websocket / service di telemetria.
    // Per ora, una demo minima coerente:
    const numericDemo: Record<string, number> = {
      capacity_utilization: 82,
      area_crowding_pct: 64,
      avg_basket_value: 14.3,
      nps_live: 38,
      wifi_connected_users: 728,
      parking_occupancy: 71,
    };
    return numericDemo[statId] ?? 0;
  }

  // ──────────────────────────────────────────────
  // UI sugar
  // ──────────────────────────────────────────────
  private humanizeComponentTitle(key: UiComponentKey): string {
    switch (key) {
      case "ProgressMetricCardComponent":
        return "Metriche Live";
      case "BarRatingCardComponent":
      case "CircleRatingCardComponent":
        return "Valutazioni Live";
      case "DonutChartCardComponent":
        return "Distribuzioni %";
      case "EnumPillCardComponent":
        return "Stato / Modalità";
      case "SparklineKpiCardComponent":
        return "Trend in Tempo Reale";
      case "GaugeMetricCardComponent":
        return "Indicatori di Attesa";
      case "DiscreteHistogramCardComponent":
        return "Distribuzione Valori";
      case "MinimalTimelineCardComponent":
        return "Timeline Programma";
      case "RankingListCardComponent":
        return "Ranking Aree";
      case "StackedProgressCardComponent":
        return "Composizioni %";
      default:
        return "Statistiche Live";
    }
  }
}
