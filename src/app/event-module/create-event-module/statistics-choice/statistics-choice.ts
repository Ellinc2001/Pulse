// statistics-choice.ts
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventType } from "../../stat-visual-map";
import { StatsProviderFactory } from "../../services/stats-provider-factory";

export interface StatisticOption {
  id: string;
  label: string;
  description?: string;
  enabled: boolean;     
  recommended: boolean; 
  group: string;  
}

@Component({
  selector: "app-statistics-choice",
  templateUrl: "./statistics-choice.html",
  styleUrls: ["./statistics-choice.scss"],
  standalone: false,
})
export class StatisticsChoiceComponent implements OnInit {
  eventType!: EventType;
  groupedStatistics: { group: string; stats: StatisticOption[] }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private providers: StatsProviderFactory
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.eventType = params['eventType'] as EventType;

      const provider = this.providers.getProvider(this.eventType);

      const metaMap = provider.getStatsMeta();
      const recommendedIds = new Set(
        provider.getRecommendedStatIds?.(this.eventType) ?? []
      );

      const stats: StatisticOption[] = Object.entries(metaMap).map(
        ([id, meta]) => ({
          id,
          label: meta.label ?? id,
          description: meta.description ?? '',
          enabled: recommendedIds.has(id),    
          recommended: recommendedIds.has(id),
          group: meta.group ?? 'Altro',
        })
      );

      const groups: Record<string, StatisticOption[]> = {};
      for (const stat of stats) {
        (groups[stat.group] ??= []).push(stat);
      }

      this.groupedStatistics = Object.entries(groups)
        .map(([group, list]) => ({
          group,
          stats: list.sort((a, b) => a.label.localeCompare(b.label)),
        }))
        .sort((a, b) => a.group.localeCompare(b.group));
    });
  }

  onToggleStatistic(stat: StatisticOption): void {
    stat.enabled = !stat.enabled;
    console.log(`[statistics-choice] Toggled ${stat.id}: ${stat.enabled}`);
  }

  onBackClick(): void {
    window.history.back();
  }

  goToDetailChoice(): void {
    this.router.navigate(['event/create/detail-choice'], {
      queryParams: { eventType: this.eventType },
    });
  }
}
