import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { take } from 'rxjs/internal/operators/take';
import { UserService } from 'src/app/core/services/users/user.service';
import { User } from 'src/app/models/users/user';

@Injectable({
  providedIn: 'root'
})
export class UniqueUserValidatorService {

  constructor(
    private userService: UserService
  ) { }

  unique(type: string, initialValue: string = ''): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<{ [key: string]: any } | null>
      | Observable<{ [key: string]: any } | null> => {
      if (control.value === '' || control.value.length === 0) {
        return of(null);
      } else if (control.value === initialValue) {
        return of(null);
      } else {
        return control.valueChanges.pipe(
          debounceTime(500),
          take(1),
          switchMap(_ =>
            this.userService
              .findUserBy(type, control.value)
              .pipe(
                map((users: User[]) =>
                  ((users.length === 0) ? null : { exist: { value: control.value } })
                )
              )
          )
        );
      }
    };
  }
}
