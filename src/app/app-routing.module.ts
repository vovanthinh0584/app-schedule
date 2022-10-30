import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: 'login', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadChildren: () => import('../app/pages/login/login.module').then( m => m.LoginPageModule)},
  { path: 'main', loadChildren:  () => import('../app/pages/main/main.module').then( m => m.MainModule)},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
