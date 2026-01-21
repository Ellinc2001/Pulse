import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfileView } from './profile-view/profile-view';
import { GroupDetailComponent } from './group-detail/group-detail';

const routes: Routes = [
  {
    path: 'event',
    loadChildren: () =>
      import('./event-module/event-module.module').then(m => m.EventModule),
  },
  {
    path: 'my-vibes',
    loadChildren: () =>
      import('./my-pulse-module/my-pulse.module').then(m => m.MyPulseModule),
  },
  {
    path: 'profile-view',
    component: ProfileView
  },
  {
    path: 'group-detail',
    component: GroupDetailComponent
  },
  { path: '', redirectTo: 'event', pathMatch: 'full' },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
