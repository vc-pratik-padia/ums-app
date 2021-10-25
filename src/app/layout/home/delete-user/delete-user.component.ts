import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private selfDialogRef: MatDialogRef<DeleteUserComponent>
  ) { }

  ngOnInit(): void {
  }

  onConfirmClick() {
    this.selfDialogRef.close(1);
  }

}
