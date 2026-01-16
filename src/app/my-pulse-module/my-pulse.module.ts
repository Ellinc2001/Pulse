import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPulseRoutingModule } from './my-pulse-module-routing.module';
import { MyPulseComponent } from './my-pulse/my-pulse';
import { IonicModule } from '@ionic/angular';
import { PreferencesConfigComponent } from './preferences-config/preferences-config';
import { FormsModule } from '@angular/forms';
import { InviteCard } from './invite-card/invite-card';
import { SparksModalComponent } from './sparks-modal/sparks-modal';


@NgModule({
  declarations: [MyPulseComponent, PreferencesConfigComponent, InviteCard, SparksModalComponent],
  imports: [
    CommonModule,
    MyPulseRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class MyPulseModule { }
