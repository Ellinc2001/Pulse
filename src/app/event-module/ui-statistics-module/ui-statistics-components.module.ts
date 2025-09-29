import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarRatingCardComponent } from './bar-rating-card/bar-rating-card';
import { IonicModule } from '@ionic/angular';
import { CircleRatingCardComponent } from './circle-rating-card/circle-rating-card';
import { DiscreteHistogramCardComponent } from './discrete-histogram-card/discrete-histogram-card';
import { DonutChartCardComponent } from './donut-chart-card/donut-chart-card';
import { EnumPillCardComponent } from './enum-pill-card/enum-pill-card';
import { GaugeMetricCardComponent } from './gauge-metric-card/gauge-metric-card';
import { MinimalTimelineCardComponent } from './minimal-timeline-card/minimal-timeline-card';
import { ProgressMetricCardComponent } from './progress-metric-card/progress-metric-card';
import { RankingListCardComponent } from './ranking-list-card/ranking-list-card';
import { SparklineKpiCardComponent } from './sparkline-kpi-card/sparkline-kpi-card';
import { StackedProgressCardComponent } from './stacked-progress-card/stacked-progress-card';



@NgModule({
  declarations: [
    BarRatingCardComponent,
    CircleRatingCardComponent,
    DiscreteHistogramCardComponent,
    DonutChartCardComponent,
    EnumPillCardComponent,
    GaugeMetricCardComponent,
    MinimalTimelineCardComponent,
    ProgressMetricCardComponent,
    RankingListCardComponent,
    SparklineKpiCardComponent,
    StackedProgressCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class UiStatisticsComponentsModule { }
