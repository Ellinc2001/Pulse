import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventModuleRoutingModule } from './create-event-module-routing.module';
import { CreateEventComponent } from './create-event/create-event';
import { StatisticsChoiceComponent } from './statistics-choice/statistics-choice';
import { IonicModule } from '@ionic/angular';
import { EventDetailChoiceComponent } from './event-detail-choice/event-detail-choice';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateEventComponent, StatisticsChoiceComponent, EventDetailChoiceComponent],
  imports: [
    CommonModule,
    CreateEventModuleRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class CreateEventModuleModule { }
