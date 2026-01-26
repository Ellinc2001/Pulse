import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealTimeStatsComponent } from './real-time-stats.component.ts/real-time-stats';

const routes: Routes = [
  { path: '', component: RealTimeStatsComponent },  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealTimeStatsRoutingModule { }
