import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipSelectorComponent } from './chip-selector/chip-selector';
import { IconButtonGroupComponent } from './icon-button-group/icon-button-group';
import { IconRatingComponent } from './icon-rating/icon-rating';
import { IonicModule } from '@ionic/angular';
import { RangeSliderComponent } from './range-slider/range-slider';
import { RatingCirclesComponent } from './rating-circle/rating-circle';
import { SegmentedControlComponent } from './segmented-control/segmented-control';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch';



@NgModule({
  declarations: [
    ChipSelectorComponent,
    IconButtonGroupComponent,
    IconRatingComponent,
    RangeSliderComponent,
    RatingCirclesComponent,
    SegmentedControlComponent,
    ToggleSwitchComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ChipSelectorComponent,
    IconButtonGroupComponent,
    IconRatingComponent,
    RangeSliderComponent,
    RatingCirclesComponent,
    SegmentedControlComponent,
    ToggleSwitchComponent
  ]
})
export class UiInputStatisticsModuleModule { }
