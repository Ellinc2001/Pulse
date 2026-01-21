import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPulseComponent } from './my-pulse/my-pulse';
import { PreferencesConfigComponent } from './preferences-config/preferences-config';
import { CreateGroupComponent } from './create-group/create-group';

const routes: Routes = [
  { path: '', component: MyPulseComponent },
  { path: 'preferences-config', component: PreferencesConfigComponent },  
  { path: 'create-group', component: CreateGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPulseRoutingModule { }
