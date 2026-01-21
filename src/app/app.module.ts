import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CompassSearchButtonComponent } from './compass-search-button/compass-search-button';
import { ProfileButtonComponent } from './profile-button/profile-button';
import { MyVibesButtonComponent } from './my-vibes-button/my-vibes-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DraggableBadgeComponent } from './draggable-badge/draggable-badge';
import { FormsModule } from '@angular/forms';
import { XpLightningComponent } from './xp-lightning-component/xp-lightning-component';
import { UserProfileModalComponent } from './modals/user-profile-modal/user-profile-modal';
import { UserSearchModalComponent } from './modals/user-search-modal/user-search-modal';
import { CountdownEventsModalComponent } from './modals/countdown-events-modal/countdown-events-modal.component';
import { InvitesModalComponent } from './modals/invites-modal/invites-modal.component';
import { ProfileView } from './profile-view/profile-view';
import { GroupDetailComponent } from './group-detail/group-detail';


@NgModule({
  declarations: [
    AppComponent,
    CompassSearchButtonComponent, 
    ProfileButtonComponent, 
    MyVibesButtonComponent, 
    DraggableBadgeComponent, 
    UserProfileModalComponent, 
    UserSearchModalComponent, 
    XpLightningComponent, 
    CountdownEventsModalComponent, 
    InvitesModalComponent, ProfileView, GroupDetailComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
