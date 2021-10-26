import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  /**
   * @var user To hold logged user data
   */
  user: User;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUserInfo();
  }

  /**
   * Logout user from the system and clear localstroage
   */
  logout(): void {
    this.authService.logout();
    this.alertService.showMessage(`Logged out successfully!`);
    this.router.navigate(['../auth/login']);
  }
}
