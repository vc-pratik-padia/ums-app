import { Component, OnInit } from '@angular/core';
import { User } from './models/index';
import { UserService } from './core/services/users/user.service';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: User[] = [];
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const loggedUserData = this.authService.getLoggedInUserInfo();
    if (loggedUserData.id) {
      this.userService.findUserBy('email', loggedUserData.email)
      .subscribe(
        (users) => {
          if (users.length !== 0) {
            this.userService.storeUserInfo(users[0]);
          }
        }
      );
    }
  }

}
