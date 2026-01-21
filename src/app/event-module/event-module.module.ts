import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventModuleRoutingModule } from './event-module-routing.module';
import { EventsSearchComponent } from './event-search/events-search';
import { EventCardComponent } from './event-card/event-card';
import { FilterBarComponent } from './filter-bar/filter-bar';
import { IonicModule } from "@ionic/angular";
import { EventChat } from './event-chat/event-chat';
import { RealTimeStatsComponent } from './real-time-stats/real-time-stats';
import { LiveEventDetail } from './live-event-detail/live-event-detail';
import { FormsModule } from '@angular/forms';
import { RealTimeStatsNotify } from './real-time-stats-notify/real-time-stats-notify';
import { SpinnerComponent } from '../spinner/spinner';
import { FoodCardComponent } from './food-card/food-card';
import { LocationCardComponent } from './location-card/location-card';
import { MusicCardComponent } from './music-card/music-card';
import { FilterModule } from './filter-module/filter.module';
import { ParticipantsModalComponent } from './participants-modal/participants-modal';

@NgModule({
  declarations: [
    EventsSearchComponent,
    EventCardComponent,
    FilterBarComponent,
    EventChat,
    RealTimeStatsComponent,
    LiveEventDetail,
    RealTimeStatsNotify,
    FoodCardComponent,
    LocationCardComponent,
    MusicCardComponent,
    ParticipantsModalComponent
  ],
  imports: [
    CommonModule,
    EventModuleRoutingModule,
    IonicModule,
    FormsModule,
    FilterModule,
    SpinnerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class EventModule { }
