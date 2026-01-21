import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventModuleRoutingModule } from './create-event-module-routing.module';
import { CreateEventComponent } from './create-event/create-event';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateEventComponent],
  imports: [
    CommonModule,
    CreateEventModuleRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class CreateEventModuleModule { }
