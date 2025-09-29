import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateEventComponent } from "./create-event/create-event";
import { StatisticsChoiceComponent } from "./statistics-choice/statistics-choice";

const routes: Routes = [
  { path: '', component: CreateEventComponent },
  { path: 'statistics-choice', component: StatisticsChoiceComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEventModuleRoutingModule { }