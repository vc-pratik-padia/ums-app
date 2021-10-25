import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/users/user.service';
import { User } from 'src/app/models';
import { ViewUserComponent } from './view-user/view-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component'
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  curruser: User | string | boolean;
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  resultsLength: number = 0;
  isLoadingResults: boolean = true;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.curruser = this.authService.getLoggedInUserInfo();
  }

  ngAfterViewInit(): void {
    this.loadUsers();
  }

  viewUserDialog(user: User): void {
    this.dialog.open(ViewUserComponent, {
      width: "400px",
      data: {
        user
      },
    });
  }

  deleteDialog(user: User): void {
    const deleteDialogRef = this.dialog.open(DeleteUserComponent, {
      width: "400px"
    });

    deleteDialogRef.afterClosed().subscribe((action: boolean) => {
      if(action) {
        this.userService.deleteUser(user.id).subscribe((deleted: boolean) => {
          if(deleted) {
            this.alertService.showMessage('User has been deleted successfully');
            this.loadUsers();
          } else {
            this.alertService.showMessage('Failed to delete user');
          }
        });
      }
    });
  }

  loadUsers(): void {
    merge(this.sort.sortChange)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        const params = {
          'q': '',
          '_sort': this.sort.active,
          '_order': this.sort.direction,
        };
        return this.userService.getUsers(params).pipe(catchError(() => observableOf(null)));
      }),
      map(data => {
        this.isLoadingResults = false;
        if(data === null) {
          return [];
        }
        this.resultsLength = data.length;
        return data;
      })
    )
    .subscribe((data) => {
      this.users = data;
    });
  }

}
