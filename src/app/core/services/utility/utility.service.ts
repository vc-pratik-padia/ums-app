import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private authService: AuthService
  ) { }

  /**
   * @returns Return role name of logged in user based on localstorage data
   */
  getRole(): string {
    const user = this.authService.getLoggedInUserInfo();
    return (user.role || 'user');
  }

  /**
   * To validate the control of form group has error or not
   * @param formGroup Object of the form group
   * @param control control that need to be verfieid
   * @param validationType type of validation need to validate
   * @returns based on control and validation type boolean value will be returned
   */
  checkError(formGroup: FormGroup, control: string, validationType: string): boolean {
    return (
      formGroup.get(control).invalid &&
      (formGroup.get(control).dirty || formGroup.get(control).touched) &&
      formGroup.get(control).errors[validationType]
    );
  }
}
