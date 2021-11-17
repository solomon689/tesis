import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CurrentSessionGuard } from './guards/current-session.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/geoen/start',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
  path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'geoen',
    canActivate: [CurrentSessionGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  }

    

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
