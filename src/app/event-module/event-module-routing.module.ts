import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsSearchComponent } from './event-search/events-search';
import { LiveEventDetail } from './live-event-detail/live-event-detail';

const routes: Routes = [
  { path: '', component: EventsSearchComponent }, 
  { path: 'event-detail', component: LiveEventDetail }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventModuleRoutingModule { }
