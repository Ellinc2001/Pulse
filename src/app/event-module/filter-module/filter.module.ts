import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatChoiceComponent } from './format-choice/format-choice';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilterChoiceComponent } from './filter-choice/filter-choice';



@NgModule({
  declarations: [
    FormatChoiceComponent,
    FilterChoiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class FilterModule { }
