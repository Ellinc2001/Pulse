import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsSearchComponent } from './event-search/events-search';
import { LiveEventDetail } from './live-event-detail/live-event-detail';
import { RealTimeStatsComponent } from './real-time-stats/real-time-stats';
import { RealTimeStatsNotify } from './real-time-stats-notify/real-time-stats-notify';

const routes: Routes = [
  { path: '', component: EventsSearchComponent }, 
  { path: 'event-detail', component: LiveEventDetail },
  { path: 'real-time-stats', component: RealTimeStatsComponent },
  { path: 'real-time-stats-notify', component: RealTimeStatsNotify },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventModuleRoutingModule { }
