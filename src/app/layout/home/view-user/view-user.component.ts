import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  user: User;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.user = data.user;
    }
  }
}
