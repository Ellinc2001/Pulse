import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

// 👇 usa SOLO i tipi / mappe già esistenti
import {
  STAT_META,
  REGISTRY_COMPONENT_SELECTOR,
  type UiComponentKey,
  type EventType,
} from "../stat-visual-map";

@Component({
  selector: "app-real-time-stats",
  templateUrl: "./real-time-stats.html",
  styleUrls: ["./real-time-stats.scss"],
  standalone: false,
})
export class RealTimeStatsComponent implements OnInit {
  event: { id: string; title: string } | null = null;

  // (opzionale) se lo hai nel dettaglio evento, impostalo per filtrare con appliesTo
  eventType?: EventType; // es: 'club'

  /** Esempio: id statistiche scelte dall’organizzatore (ordine intenzionale) */
  chosenStatIds: string[] = [
    "capacity_utilization",
    "area_crowding_pct",
    "timeline_program",
    "food_stand_wait",
    "avg_basket_value",
    "sound_quality",
    "sentiment_share",
    "wifi_quality",
    "parking_occupancy",
  ];

  /** Risultato per il template (niente tipo custom esportato) */
  widgets: Array<{
    id: string;
    label: string;
    description?: string;
    component: UiComponentKey;
    selector: string;
  }> = [];

  // ────────────────────────────────────────────────────────────
  // Algoritmo: variety-first, stable
  // 1) rispetta l’ordine scelto (stable)
  // 2) bilancia i componenti alternando i ComponentKey (round-robin per bucket)
  // 3) (opzionale) filtra per appliesTo se hai eventType
  // ────────────────────────────────────────────────────────────
  private buildOrderedWidgets(ids: string[]) {
    // 1) normalizza e materializza
    const selected = Array.from(new Set(ids))
      .map((id) => ({ id, meta: STAT_META[id as keyof typeof STAT_META] }))
      .filter((x) => !!x.meta);

    // 2) filtro appliesTo (solo se eventType è valorizzato e l’estensione lo ha impostato)
    const filtered = selected.filter(({ meta }) => {
      const applies = meta.appliesTo;
      if (!this.eventType || !applies) return true; // nessun filtro
      return applies === "ALL" || (applies as EventType[]).includes(this.eventType);
    });

    // 3) bucket per ComponentKey nell’ordine di prima occorrenza
    const orderOfComponents: UiComponentKey[] = [];
    const buckets = new Map<UiComponentKey, Array<{
      id: string; label: string; description?: string; component: UiComponentKey; selector: string;
    }>>();

    for (const { id, meta } of filtered) {
      const comp = meta.uiComponent;
      if (!buckets.has(comp)) {
        buckets.set(comp, []);
        orderOfComponents.push(comp);
      }
      buckets.get(comp)!.push({
        id,
        label: meta.label ?? id,
        description: meta.description,
        component: comp,
        selector: REGISTRY_COMPONENT_SELECTOR[comp],
      });
    }

    // 4) interleaving round-robin tra i bucket (variety-first, stable by-bucket)
    const out: typeof this.widgets = [];
    let remaining = true;
    while (remaining) {
      remaining = false;
      for (const comp of orderOfComponents) {
        const arr = buckets.get(comp)!;
        if (arr.length) {
          out.push(arr.shift()!);
          remaining = true;
        }
      }
    }
    return out;
  }

  // ────────────────────────────────────────────────────────────
  // Lifecycle + azioni già presenti
  // ────────────────────────────────────────────────────────────
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.event = (nav?.extras?.state as any)?.event ?? history.state?.event ?? null;

    // se da backend hai il tipo evento, assegnalo:
    // this.eventType = 'club';

    this.widgets = this.buildOrderedWidgets(this.chosenStatIds);
  }

  back() {
    this.router.navigate(["/event-detail", this.event?.id]);
  }

  close() {
    this.router.navigate(["/events"]);
  }
}
