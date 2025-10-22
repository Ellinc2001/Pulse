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
  | 'ToggleSwitchComponent'
  | 'UserRatingCardComponent'

export type ComponentInputsMap = Partial<Record<UiComponentKey, ReadonlyArray<string>>>;
export const UI_COMPONENT_INPUTS: ComponentInputsMap = {
  BarRatingCardComponent:         ['title','icon','value','maxValue','showFraction','eventId','statId'],
  CircleRatingCardComponent:      ['title','icon','value','maxValue','showFraction','eventId','statId'],
  DiscreteHistogramCardComponent: ['title','data','showMenu','maxHeight','eventId','statId'],
  DonutChartCardComponent:        ['title','segments','centerText','centerSubtext','showMenu','eventId','statId'],
  EnumPillCardComponent:          ['title','icon','options','selectedValue','allowDeselect','eventId','statId'],
  ProgressMetricCardComponent:    ['eventId','statId','title','icon','value','unit','maxValue','showGradient'],
  StackedProgressCardComponent:   ['title','segments','showMenu','unit','eventId','statId'],
  GaugeMetricCardComponent:       ['title','value','min','max','unit','showMenu','eventId','statId'],
  MinimalTimelineCardComponent:   ['title','timeline','showMenu','eventId','statId'],
  RankingListCardComponent:       ['title','items','showMenu','eventId','statId'],
  SparklineKpiCardComponent:      ['title','series','unit','showMenu','value','eventId','statId'],
  WaitTimePillsComponent:         ['title','waitTime']  // niente eventId/statId: il componente non li ha
};

export const REGISTRY_COMPONENT_SELECTOR: Record<UiComponentKey, string> = {
  BarRatingCardComponent:         'app-bar-rating-card',
  CircleRatingCardComponent:      'app-circle-rating-card',
  DiscreteHistogramCardComponent: 'app-discrete-histogram-card',  // fix
  DonutChartCardComponent:        'app-donut-chart-card',
  EnumPillCardComponent:          'app-enum-pill-card',
  GaugeMetricCardComponent:       'app-gauge-metric-card',
  MinimalTimelineCardComponent:   'app-minimal-timeline-card',     // fix
  ProgressMetricCardComponent:    'app-progress-metric-card',
  RankingListCardComponent:       'app-ranking-list-card',
  SparklineKpiCardComponent:      'app-sparkline-kpi-card',        // fix
  StackedProgressCardComponent:   'app-stacked-progress-card',
  WaitTimePillsComponent:         'app-wait-time-pills',
};

export const REGISTRY_INPUT_COMPONENT_SELECTOR: Record<InputComponentKey, string> = {
  ChipSelectorComponent:       'app-chip-selector',
  IconButtonGroupComponent:    'app-icon-button-group',
  IconRatingComponent:         'app-icon-rating',
  RangeSliderComponent:        'app-range-slider',
  RatingCirclesComponent:      'app-rating-circle',
  SegmentedControlComponent:   'app-segmented-control',
  ToggleSwitchComponent:       'app-toggle-switch',
  UserRatingCardComponent:     'app-user-rating-card',

};

// ui-reflection-map.ts (o un file ad hoc)
import { Type } from '@angular/core'
import { BarRatingCardComponent } from './ui-statistics-module/bar-rating-card/bar-rating-card';
import { CircleRatingCardComponent } from './ui-statistics-module/circle-rating-card/circle-rating-card';
import { DiscreteHistogramCardComponent } from './ui-statistics-module/discrete-histogram-card/discrete-histogram-card';
import { DonutChartCardComponent } from './ui-statistics-module/donut-chart-card/donut-chart-card';
import { EnumPillCardComponent } from './ui-statistics-module/enum-pill-card/enum-pill-card';
import { GaugeMetricCardComponent } from './ui-statistics-module/gauge-metric-card/gauge-metric-card';
import { MinimalTimelineCardComponent } from './ui-statistics-module/minimal-timeline-card/minimal-timeline-card';
import { ProgressMetricCardComponent } from './ui-statistics-module/progress-metric-card/progress-metric-card';
import { RankingListCardComponent } from './ui-statistics-module/ranking-list-card/ranking-list-card';
import { SparklineKpiCardComponent } from './ui-statistics-module/sparkline-kpi-card/sparkline-kpi-card';
import { StackedProgressCardComponent } from './ui-statistics-module/stacked-progress-card/stacked-progress-card';
import { WaitTimePillsComponent } from './wait-time-pills/wait-time-pills';
import { ChipSelectorComponent } from './ui-input-statistics-module/chip-selector/chip-selector';
import { IconButtonGroupComponent } from './ui-input-statistics-module/icon-button-group/icon-button-group';
import { IconRatingComponent } from './ui-input-statistics-module/icon-rating/icon-rating';
import { RangeSliderComponent } from './ui-input-statistics-module/range-slider/range-slider';
import { RatingCirclesComponent } from './ui-input-statistics-module/rating-circle/rating-circle';
import { SegmentedControlComponent } from './ui-input-statistics-module/segmented-control/segmented-control';
import { ToggleSwitchComponent } from './ui-input-statistics-module/toggle-switch/toggle-switch';
import { UserRatingCardComponent } from './ui-input-statistics-module/user-rating-card/user-rating-card';

export const REGISTRY_COMPONENT_TYPE: Record<UiComponentKey, Type<any>> = {
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
  WaitTimePillsComponent,
}

export const REGISTRY_INPUT_COMPONENT_TYPE: Record<InputComponentKey, Type<any>> = {
  ChipSelectorComponent,
  IconButtonGroupComponent,
  IconRatingComponent,
  RangeSliderComponent,
  RatingCirclesComponent,
  SegmentedControlComponent,
  ToggleSwitchComponent,
  UserRatingCardComponent
};

// ui-input-reflection-map.ts (o accanto a dove tieni UI_COMPONENT_INPUTS)
export type InputComponentInputsMap = Partial<Record<InputComponentKey, ReadonlyArray<string>>>;

export const INPUT_COMPONENT_INPUTS: InputComponentInputsMap = {
  ChipSelectorComponent: ['minuteSuffix','autoLabel','options','selectedValue','selectedValues','multiSelect','title','subtitle','eventId','statId',],
  IconButtonGroupComponent: ['options','value','label','eventId','statId',],
  IconRatingComponent: ['label','max','value','iconName','eventId','statId'],
  RangeSliderComponent: ['label','min','max','value','showLabels','leftEmoji','rightEmoji','centerEmoji','leftLabel','rightLabel','variant','eventId','statId'],
  RatingCirclesComponent: ['label','max','value','eventId','statId'],
  SegmentedControlComponent: ['options','value','label','eventId','statId'],
  ToggleSwitchComponent: ['label','toggleLabel','checked','eventId','statId'],
};
