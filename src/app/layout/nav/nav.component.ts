import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  logout(): void {
    this.authService.logout();
    this.alertService.showMessage(`Logged out successfully!`);
    this.router.navigate(['../auth/login']);
  }
}
