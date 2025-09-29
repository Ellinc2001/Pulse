import { Component, OnInit } from "@angular/core";
import { M } from "../../stat-visual-map";
import { Router } from "@angular/router";

export interface EventCategory {
  id: string;
  name: string;
  icon: string;
  selected?: boolean;
}

export interface LiveStat {
  id: string;
  name: string;
  enabled: boolean;
}

export interface StatCategory {
  id: string;
  name: string;
  stats: LiveStat[];
  expanded?: boolean;
}

type GroupKey = Exclude<keyof typeof M, "ALL">;
interface UIEventGroup {
  key: GroupKey;
  label: string;
  items: EventCategory[];
}

@Component({
  selector: "app-create-event",
  templateUrl: "./create-event.html",
  styleUrls: ["./create-event.scss"],
  standalone: false,
})
export class CreateEventComponent implements OnInit {
  selectedCategory: string | null = null;
  showLiveStats = false;

  /** Gruppi per il template: label + items con name/icon */
  eventGroups: UIEventGroup[] = [];

  /** Ordine visuale dei gruppi (escludiamo 'ALL') */
  private readonly GROUP_ORDER: GroupKey[] = [
    "MUSIC", "BIZ", "FOOD", "ARTS", "SPORT", "GAMING", "PARK", "NICHE",
  ];

  /** Statistiche (puoi sostituirle con la build dinamica dal mapping) */
  statCategories: StatCategory[] = [
    {
      id: "queue-flow",
      name: "Queue & Flow",
      expanded: false,
      stats: [
        { id: "ingressi", name: "Ingressi", enabled: true },
        { id: "uscite", name: "Uscite", enabled: false },
        { id: "permanenza", name: "Permanenza Media", enabled: true },
      ],
    },
    {
      id: "engagement",
      name: "Engagement",
      expanded: false,
      stats: [
        { id: "likes", name: "Likes / Minuto", enabled: true },
        { id: "commenti", name: "Commenti / Minuto", enabled: false },
        { id: "condivisioni", name: "Condivisioni", enabled: true },
      ],
    },
    {
      id: "demographics",
      name: "Demographics",
      expanded: false,
      stats: [
        { id: "genere", name: "Distribuzione Genere", enabled: false },
        { id: "eta", name: "Fasce d'età", enabled: true },
      ],
    },
  ];

  public constructor(private router: Router){

  }
  ngOnInit(): void {
    this.eventGroups = this.buildEventGroups();
  }

  /** Costruisce i gruppi UI a partire da M (label + items con name/icon) */
  private buildEventGroups(): UIEventGroup[] {
    return this.GROUP_ORDER.map((key) => {
      const group = M[key]; // { label, items: EventType[] }
      return {
        key,
        label: group.label,
        items: group.items.map((id) => ({
          id,
          name: this.humanizeEvent(id),
          icon: this.iconForEvent(id),
          selected: false,
        })),
      };
    });
  }

  /** Selezione categoria: aggiorna lo stato visuale e mostra le stats */
  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;

    // aggiorna selected per feedback visivo
    this.eventGroups = this.eventGroups.map((g) => ({
      ...g,
      items: g.items.map((it) => ({ ...it, selected: it.id === categoryId })),
    }));

    // mostra la sezione statistiche
    this.showLiveStats = true;

    // (opzionale) qui puoi rigenerare statCategories in base alla tipologia:
    // this.statCategories = this.buildStatsFor(categoryId);
  }

  toggleStatCategory(categoryId: string): void {
    const category = this.statCategories.find((cat) => cat.id === categoryId);
    if (category) category.expanded = !category.expanded;
  }

  toggleStat(categoryId: string, statId: string): void {
    const category = this.statCategories.find((cat) => cat.id === categoryId);
    if (!category) return;
    const stat = category.stats.find((s) => s.id === statId);
    if (stat) stat.enabled = !stat.enabled;
  }

  createEvent(): void {
    if (!this.selectedCategory) return;

    // (se vuoi salvare le stat selezionate, falla qui)
    this.router.navigate(
      ['/event/create/statistics-choice'],
      { queryParams: { eventType: this.selectedCategory } } // ⬅️ passa il tipo evento
    );
  }

  get canCreateEvent(): boolean {
    return this.selectedCategory !== null;
  }

  // ————— Helpers di presentazione —————
  private humanizeEvent(id: string): string {
    const map: Record<string, string> = {
      club: "Discoteca / Club",
      concert: "Concerto",
      festival: "Festival musicale",
      conference: "Conferenza",
      expo: "Fiera / Expo",
      theater: "Teatro",
      cinema: "Cinema / Première",
      stadium: "Partita sportiva",
      marathon: "Maratona / Corsa",
      esports: "eSports / Torneo",
      food_festival: "Food Festival",
      market: "Mercato / Night market",
      museum: "Mostra / Museo",
      theme_park: "Theme Park",
      wedding: "Wedding / Ricevimento",
      open_day: "University Open Day",
      charity_gala: "Charity Gala",
      coworking: "Co-working / Hub",
      meetup: "Meetup / Community",
      wellness: "Yoga / Wellness",
      book_fair: "Fiera del libro",
      demo_day: "Startup Demo Day",
      lan_party: "LAN Party",
      corporate_event: "Evento aziendale",
    };
    return map[id] ?? id;
  }

  private iconForEvent(id: string): string {
    const map: Record<string, string> = {
      club: "musical-notes",
      concert: "mic",
      festival: "disc",
      conference: "briefcase",
      expo: "business",
      corporate_event: "people",
      demo_day: "megaphone",
      open_day: "school",
      meetup: "chatbubbles",
      food_festival: "fast-food",
      market: "storefront",
      wedding: "gift",
      theater: "ticket",
      cinema: "film",
      museum: "easel",
      stadium: "american-football",
      marathon: "walk",
      esports: "game-controller",
      lan_party: "laptop",
      theme_park: "sparkles",
      coworking: "desktop",
      wellness: "leaf",
      book_fair: "book",
      charity_gala: "ribbon",
    };
    return map[id] ?? "pricetag";
  }

  // (facoltativo) esempio se vuoi rigenerare le stats per tipo evento
  // private buildStatsFor(eventTypeId: string): StatCategory[] {
  //   // usa getStatsForEvent(eventTypeId) dal tuo mapping e raggruppa per sezione
  //   return [...];
  // }
}
