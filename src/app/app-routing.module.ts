import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { AuthComponent } from './layout/auth/auth.component';
import { ContentComponent } from './layout/content/content.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      }
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
