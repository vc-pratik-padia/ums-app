import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private duraton = 5;
  constructor(private snackBar: MatSnackBar) {}

  /**
   * To show toastr message
   * @param message text needs to de displayed
   * @param action text of button
   */
  showMessage(message: string, action: string = 'dismiss') {
    this.snackBar.open(message, action, {
      duration: this.duraton * 1000,
    });
  }
}
