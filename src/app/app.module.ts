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
import { UserProfileModalComponent } from './user-profile-modal/user-profile-modal';
import { UserSearchModalComponent } from './user-search-modal/user-search-modal';
import { FormsModule } from '@angular/forms';
import { XpLightningComponent } from './xp-lightning-component/xp-lightning-component';


@NgModule({
  declarations: [AppComponent, CompassSearchButtonComponent, ProfileButtonComponent, MyVibesButtonComponent, DraggableBadgeComponent, UserProfileModalComponent, UserSearchModalComponent, XpLightningComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
