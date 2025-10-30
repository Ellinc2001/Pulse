import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormatChoiceComponent } from './format-choice/format-choice';
import { FilterChoiceComponent } from './filter-choice/filter-choice';


const routes: Routes = [
    { path: '', component: FormatChoiceComponent },  
    { path: 'filter', component: FilterChoiceComponent }, 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterRoutingModule { }