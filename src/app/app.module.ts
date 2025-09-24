import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CompassSearchButtonComponent } from './compass-search-button/compass-search-button';
import { ProfileButtonComponent } from './profile-button/profile-button';
import { MyVibesButtonComponent } from './my-vibes-button/my-vibes-button';
import { MenuListComponent } from './menu-list/menu-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent, CompassSearchButtonComponent, ProfileButtonComponent, MyVibesButtonComponent ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
