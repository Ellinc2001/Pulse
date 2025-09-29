import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventModuleRoutingModule } from './create-event-module-routing.module';
import { CreateEventComponent } from './create-event/create-event';
import { StatisticsChoiceComponent } from './statistics-choice/statistics-choice';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [CreateEventComponent, StatisticsChoiceComponent],
  imports: [
    CommonModule,
    CreateEventModuleRoutingModule,
    IonicModule
  ]
})
export class CreateEventModuleModule { }
