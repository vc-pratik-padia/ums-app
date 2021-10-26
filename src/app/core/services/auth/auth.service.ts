import { Injectable } from '@angular/core';
import { UserService } from '../users/user.service';
import { LoginRequest, User } from '../../../models/';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * @param userService UserService Object
   */
  constructor(
    private userService: UserService
  ) { }

  /**
   * Get logged in user data from local storage if present otherwise false will be return
   * @returns Returns logged in user data from localstorage. In case user no logged in false will be return.
   */
  getLoggedInUserInfo(): User {
    const encodedString = localStorage.getItem('user');
    if (encodedString) {
      const user: User = JSON.parse(atob(encodedString));
      return user;
    } else {
      return {} as User;
    }
  }

  /**
   * Helps to login to system using credentials
   * @param creds Model object of LoginRequest
   * @returns Returns logged user resonse. In case invalid credentials empty repsonse will be returned
   */
  login(creds: LoginRequest): Observable<User[]> {
    return this.userService.findUserBy('email', creds.email);
  }

  /**
   * Clear local storage data
   */
  logout(): void {
    localStorage.clear();
  }
}

