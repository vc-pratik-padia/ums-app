import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { UniqueUserValidatorService } from 'src/app/shared/unique-user-validator/unique-user-validator.service';
import { Roles } from 'src/app/core/constants/roles';
import { UserService } from 'src/app/core/services/users/user.service';
import { finalize } from 'rxjs/operators';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  addUserForm: FormGroup;
  isSubmitted = false;
  isLoading = false;
  roles: string[] = Roles;
  checkError: any;

  constructor(
    private formBuilder: FormBuilder,
    private uniqueUserValidator: UniqueUserValidatorService,
    private userService: UserService,
    private alertService: AlertService,
    private utilityService: UtilityService,
    private router: Router
  ) {
    this.addUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], this.uniqueUserValidator.unique('email')],
      username: [
        '',
        [
          Validators.required,
          Validators.min(5),
          Validators.pattern(/^[\w\-]+$/)
        ],
        this.uniqueUserValidator.unique('username')
      ],
      role: ['', [Validators.required]]
    });

    this.checkError = this.utilityService.checkError;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.isLoading = true;
    const params = this.addUserForm.value;
    this.userService.storeUser(params)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isSubmitted = false;
        })
      )
      .subscribe(
        (inserted) => {
          if (inserted) {
            this.router.navigate(['../']);
            this.alertService.showMessage('User has been added successfully');
          } else {
            this.alertService.showMessage('Failed to add user, please try again');
          }
        },
        () => this.alertService.showMessage('Something went wrong')
      );
  }
}
