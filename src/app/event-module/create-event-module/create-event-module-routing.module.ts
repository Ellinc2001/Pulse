import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateEventComponent } from "./create-event/create-event";
import { StatisticsChoiceComponent } from "./statistics-choice/statistics-choice";
import { EventDetailChoiceComponent } from "./event-detail-choice/event-detail-choice";

const routes: Routes = [
  { path: '', component: CreateEventComponent },
  { path: 'statistics-choice', component: StatisticsChoiceComponent },
  { path: 'detail-choice', component: EventDetailChoiceComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEventModuleRoutingModule { }