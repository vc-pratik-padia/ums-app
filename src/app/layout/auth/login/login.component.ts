import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators/';
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
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
  ) {
    // setting up controls of login form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(5)]]
    });
  }

  checkError(control: string, validationType: string): boolean {
    return (this.loginForm.get(control).invalid && (this.loginForm.get(control).dirty || this.loginForm.get(control).touched) && this.loginForm.get(control).errors[validationType]);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    let creds = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    }
    this.authService.login(creds).pipe(
      finalize(() => this.isSubmitted = false),
    ).subscribe((users) => {
      if(users.length > 0) {
        const user = users[0] as User;
        this.userService.storeUserInfo(user);
        this.router.navigate(['../']);
      } else {
        this.alertService.showMessage(`No user found registered with ${creds.email} email, please try again!`);
      }
    }, () => {
      this.alertService.showMessage(`Something went wrong!`);
    });
  }
}
