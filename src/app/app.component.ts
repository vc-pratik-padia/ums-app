import { Component, OnInit } from '@angular/core';
import { User } from './models/index';
import { UserService } from './core/services/users/user.service';
import { AlertService } from './core/services/alert/alert.service';
import { AuthService } from './core/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: User[] = [];
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const loggedUserData = this.authService.getLoggedInUserInfo();
    if(loggedUserData) {
      this.userService.findUserBy('email', loggedUserData['email'])
      .subscribe(
        (users) => {
          if(users.length === 0) {
            this.alertService.showMessage('Please login to continue');
            this.authService.logout();
            this.router.navigate(['../auth/login'], {
              relativeTo: this.route
            });
          } else {
            this.userService.storeUserInfo(users[0]);
          }
        },
        () => {
          this.alertService.showMessage('Please login to continue');
          this.authService.logout();
          this.router.navigate(['../auth/login'], {
            relativeTo: this.route
          });
        }
      );
    }
  }

}
