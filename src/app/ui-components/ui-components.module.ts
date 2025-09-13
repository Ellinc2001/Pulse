import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from '../menu-list/menu-list';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [MenuListComponent],
  imports: [
    CommonModule,
    IonicModule
  ], 
  exports: [MenuListComponent]
})
export class UiComponentsModule { }
