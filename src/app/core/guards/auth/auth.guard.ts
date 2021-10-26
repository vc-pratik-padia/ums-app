import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alert/alert.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private route: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.authService.getLoggedInUserInfo();

      // if user details is present then continue request further
      if (user.id) {
        return true;
      }

      // if user details not present into localstorage then logout and redirect to login page
      this.authService.logout();
      this.alertService.showMessage('Please login to continue');
      this.route.navigate(['../auth/login']);
  }
}

