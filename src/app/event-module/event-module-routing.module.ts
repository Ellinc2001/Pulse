import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsSearchComponent } from './event-search/events-search';
import { LiveEventDetail } from './live-event-detail/live-event-detail';
import { RealTimeStatsComponent } from './real-time-stats/real-time-stats';
import { RealTimeStatsNotify } from './real-time-stats-notify/real-time-stats-notify';
import { CreateEventComponent } from './create-event-module/create-event/create-event';
import { StatisticsChoiceComponent } from './create-event-module/statistics-choice/statistics-choice';

const routes: Routes = [
  { path: '', component: EventsSearchComponent },   // /event
  { path: 'search', component: EventsSearchComponent }, // /event/search
  { path: 'detail/:id', component: LiveEventDetail },  // /event/detail/123
  { path: 'real-time-stats', component: RealTimeStatsComponent },
  { path: 'real-time-stats-notify', component: RealTimeStatsNotify },
    {
    path: 'create',
    loadChildren: () =>
      import('./create-event-module/create-event-module.module').then(m => m.CreateEventModuleModule),
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventModuleRoutingModule { }
