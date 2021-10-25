import { Injectable } from '@angular/core';
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
    return (user['role'] || 'user');
  }
}
