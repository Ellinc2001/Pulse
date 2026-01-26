import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RealTimeStatsComponent } from './real-time-stats.component.ts/real-time-stats';
import { DiscoClubStatsComponent } from './disco-club-stats-component/disco-club-stats-component';
import { CoworkingStatsComponent } from './coworking-stats-component/coworking-stats-component';
import { RealTimeStatsRoutingModule } from './real-time-stats-routing.module';
import { TalkStatsComponent } from './talk-stats/talk-stats-component';


@NgModule({
  declarations: [RealTimeStatsComponent, DiscoClubStatsComponent, CoworkingStatsComponent, TalkStatsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RealTimeStatsRoutingModule
  ]
})
export class RealTimeStatsModule { }
