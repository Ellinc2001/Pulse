import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { getStatsForEvent, EventType, STAT_META } from "../../stat-visual-map"

export interface StatisticOption {
  id: string
  label: string
  description?: string
  enabled: boolean
  recommended: boolean
  group: string // sezione (es: "Dati Affollamento")
}

@Component({
  selector: "app-statistics-choice",
  templateUrl: "./statistics-choice.html",
  styleUrls: ["./statistics-choice.scss"],
  standalone: false,
})
export class StatisticsChoiceComponent implements OnInit {
  eventType!: EventType
  groupedStatistics: { group: string; stats: StatisticOption[] }[] = []

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.eventType = params['eventType'] as EventType

      // recupera tutte le statistiche per tipo evento
      const stats = getStatsForEvent(this.eventType).map((s) => ({
        id: s.id,
        label: STAT_META[s.id]?.label ?? s.id,
        description: STAT_META[s.id]?.description ?? "Descrizione",
        enabled: s.recommended,
        recommended: s.recommended,
        group: STAT_META[s.id]?.group ?? "Altro",
      }))

      // raggruppa per sezione
      const groups: Record<string, StatisticOption[]> = {}
      for (const stat of stats) {
        if (!groups[stat.group]) groups[stat.group] = []
        groups[stat.group].push(stat)
      }

      // crea array ordinato
      this.groupedStatistics = Object.entries(groups).map(([group, stats]) => ({
        group,
        stats,
      }))
    })
  }

  onToggleStatistic(stat: StatisticOption): void {
    stat.enabled = !stat.enabled
    console.log(`[statistics-choice] Toggled ${stat.id}: ${stat.enabled}`)
  }

  onBackClick(): void {
    window.history.back()
  }

  goToDetailChoice(): void {
  this.router.navigate(['event/create/detail-choice'], {
    queryParams: { eventType: this.eventType } // passo anche l'evento corrente
  });
}
}
