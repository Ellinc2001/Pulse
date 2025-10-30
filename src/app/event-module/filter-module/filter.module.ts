// filter-module/filter.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormatChoiceComponent } from './format-choice/format-choice';
import { FilterChoiceComponent } from './filter-choice/filter-choice';
import { FilterRoutingModule } from './filter-routing.module';

@NgModule({
  declarations: [FormatChoiceComponent, FilterChoiceComponent],
  imports: [CommonModule, FormsModule, IonicModule, FilterRoutingModule],
})
export class FilterModule {}
