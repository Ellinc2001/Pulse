import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventModuleRoutingModule } from './event-module-routing.module';
import { EventsSearchComponent } from './event-search/events-search';
import { EventCardComponent } from './event-card/event-card';
import { FilterBarComponent } from './filter-bar/filter-bar';
import { IonicModule } from "@ionic/angular";
import { EventChat } from './event-chat/event-chat';
import { LiveVideosComponent } from './live-videos/live-videos';
import { RealTimeStatsComponent } from './real-time-stats/real-time-stats';
import { LiveEventDetail } from './live-event-detail/live-event-detail';
import { FormsModule } from '@angular/forms';
import { RealTimeStatsNotify } from './real-time-stats-notify/real-time-stats-notify';
import { UiStatisticsComponentsModule } from './ui-statistics-module/ui-statistics-components.module';
import { UiInputStatisticsModuleModule } from './ui-input-statistics-module/ui-input-statistics-module.module';
import { SpinnerComponent } from '../spinner/spinner';
import { CarouselComponent } from './carousel/carousel';
import { WaitTimePillsComponent } from './wait-time-pills/wait-time-pills';
import { ParticipantsAvatarsComponent } from './participants-avatars/participants-avatars';
import { InputContextCarousel } from './input-context-carousel/input-context-carousel';

@NgModule({
  declarations: [
    EventsSearchComponent,
    EventCardComponent,
    FilterBarComponent,
    EventChat,
    LiveVideosComponent,
    RealTimeStatsComponent,
    LiveEventDetail,
    RealTimeStatsNotify,
    CarouselComponent,
    WaitTimePillsComponent,
    ParticipantsAvatarsComponent,
    InputContextCarousel
  ],
  imports: [
    CommonModule,
    EventModuleRoutingModule,
    IonicModule,
    FormsModule,
    UiStatisticsComponentsModule,
    UiInputStatisticsModuleModule,
    SpinnerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class EventModule { }
