import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsSearchComponent } from './event-search/events-search';
import { LiveEventDetail } from './live-event-detail/live-event-detail';
import { RealTimeStatsComponent } from './real-time-stats/real-time-stats';
import { RealTimeStatsNotify } from './real-time-stats-notify/real-time-stats-notify';
import { EventChat } from './event-chat/event-chat';

const routes: Routes = [
  { path: '', component: EventsSearchComponent },   // /event
  { path: 'search', component: EventsSearchComponent }, // /event/search
  { path: 'detail', component: LiveEventDetail },  // /event/detail/123
  { path: 'real-time-stats', component: RealTimeStatsComponent },
  { path: 'real-time-stats-notify', component: RealTimeStatsNotify },
  { path: 'event-chat', component: EventChat },
    {
    path: 'create',
    loadChildren: () =>
      import('./create-event-module/create-event-module.module').then(m => m.CreateEventModuleModule),
  },
  {
    path: 'format',
    loadChildren: () =>
      import('./filter-module/filter.module').then(m => m.FilterModule),
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventModuleRoutingModule { }
