import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventSearchComponent } from './event-search/event-search';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'event-search',
    pathMatch: 'full'
  },
  { path: 'event-search', 
    component: EventSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventModuleRoutingModule { }
