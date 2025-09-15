import { NgModule } from '@angular/core';
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
import { UiComponentsModule } from '../ui-components/ui-components.module';


@NgModule({
  declarations: [
    EventsSearchComponent,
    EventCardComponent,
    FilterBarComponent,
    EventChat,
    LiveVideosComponent,
    RealTimeStatsComponent,
    LiveEventDetail
  ],
  imports: [
    CommonModule,
    EventModuleRoutingModule,
    IonicModule,
    FormsModule,
    UiComponentsModule
]
})
export class EventModule { }
