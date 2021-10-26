import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators/';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { User } from 'src/app/models';
import { AlertService } from '../../../core/services/alert/alert.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserService } from '../../../core/services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // FormGroup of login form
  loginForm: FormGroup;
  isSubmitted = false;
  checkError: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private userService: UserService,
    private utilityService: UtilityService,
    private router: Router,
  ) {
    // setting up controls of login form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(5)]]
    });

    this.checkError = this.utilityService.checkError;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    const creds = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    this.authService.login(creds).pipe(
      finalize(() => this.isSubmitted = false),
    ).subscribe((users) => {
      if (users.length > 0) {
        const user = users[0] as User;
        this.userService.storeUserInfo(user);
        this.router.navigate(['../']);
      } else {
        this.alertService.showMessage(`No user found registered with ${creds.email} email, please try again!`);
      }
    }, (data) => {
      this.alertService.showMessage(`Something went wrong!`);
    });
  }
}
