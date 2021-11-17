import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'monitoring/:id/:user',
    loadChildren: () => import('./pages/monitor-view/monitor-view.module').then(m => m.MonitorViewModule)
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '',
    redirectTo: '/not-found',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
