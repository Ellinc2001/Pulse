import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventModuleRoutingModule } from './event-module-routing.module';
import { EventSearchComponent } from './event-search/event-search';
import { EventCardComponent } from './event-card/event-card';
import { FilterBarComponent } from './filter-bar/filter-bar';


@NgModule({
  declarations: [
    EventSearchComponent,
    EventCardComponent,
    FilterBarComponent
  ],
  imports: [
    CommonModule,
    EventModuleRoutingModule
  ]
})
export class EventModuleModule { }
