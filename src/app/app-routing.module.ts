import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadChildren: () => import('../app/pages/login/login.module').then( m => m.LoginPageModule)},
  { path: 'main', loadChildren:  () => import('../app/pages/main/main.module').then( m => m.MainModule)},
  // { path: 'request', loadChildren:  () => import('../app/pages/inputRequest/inputRequest.module').then( m => m.InputRequestModule)},
  // { path: 'list-work', loadChildren:  () => import('../app/pages/listWork/listWork.module').then( m => m.ListWorkModule)},
  // { path: 'input-device-parameter', loadChildren:  () => import('../app/pages/inputDeviceParameter/inputDeviceParameter.module').then( m => m.InputDeviceParameterModule)},
  // { path: 'work-permit', loadChildren:  () => import('../app/pages/workPermit/workPermit.module').then( m => m.WorkPermitModule)},
  // { path: 'list-shift', loadChildren:  () => import('../app/pages/listShift/listShift.module').then( m => m.ListShiftModule)},
  // { path: 'notification', loadChildren:  () => import('../app/pages/notification/notification.module').then( m => m.NotificationModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
