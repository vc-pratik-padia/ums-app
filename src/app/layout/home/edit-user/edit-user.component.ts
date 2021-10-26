import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first, single, take } from 'rxjs/operators';
import { Roles } from 'src/app/core/constants/roles';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { User } from 'src/app/models/users/user';
import { UniqueUserValidatorService } from 'src/app/shared/unique-user-validator/unique-user-validator.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id: number;
  currUser: User;
  editUserForm: FormGroup;
  isSubmitted = false;
  isLoading = false;
  roles: string[] = Roles;
  checkError: any;

  constructor(
    private formBuilder: FormBuilder,
    private uniqueUserValidator: UniqueUserValidatorService,
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService,
    private utilityService: UtilityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currUser = this.authService.getLoggedInUserInfo();

    this.editUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.min(5), Validators.pattern(/^[\w\-]+$/)]],
      role: ['', [Validators.required]]
    });

    this.checkError = this.utilityService.checkError;
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params.id);

    if (isNaN(this.id)) {
      this.router.navigate(['../']);
      this.alertService.showMessage('No entity found');
      return;
    }

    if (!this.id || (this.id === this.currUser.id)) {
      this.router.navigate(['../']);
      this.alertService.showMessage('Not authorised');
      return;
    }

    this.userService.findUserBy('id', this.id.toString())
      .subscribe(users => {
        if (users.length === 0) {
          this.router.navigate(['../']);
          this.alertService.showMessage('No entity found');
        } else {
          this.editUserForm.controls.email.setAsyncValidators(this.uniqueUserValidator.unique('email', users[0].email));
          if (this.currUser.role === 'admin') {
            this.editUserForm.controls.username.setAsyncValidators([this.uniqueUserValidator.unique('username', users[0].username)]);
          }
          this.editUserForm.patchValue(users[0]);
        }
      }, () => {
        this.router.navigate(['../']);
        this.alertService.showMessage('Something went wrong');
      });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.isSubmitted = true;
    const params = this.editUserForm.value;
    this.userService.updateUser(this.id, params)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isSubmitted = false;
        })
      )
      .subscribe(
        (updated) => {
          if (updated) {
            this.router.navigate(['../']);
            this.alertService.showMessage('User has been updated successfully');
          } else {
            this.alertService.showMessage('Failed to update user, please try again');
          }
        },
        () => this.alertService.showMessage('Something went wrong')
      );
  }
}
