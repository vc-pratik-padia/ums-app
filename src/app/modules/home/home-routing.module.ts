import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from 'src/app/layout/home/add-user/add-user.component';
import { EditUserComponent } from 'src/app/layout/home/edit-user/edit-user.component';
import { HomeComponent } from 'src/app/layout/home/home.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddUserComponent
  },
  {
    path: 'edit/:id',
    component: EditUserComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
