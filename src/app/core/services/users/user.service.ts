import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable, pipe, throwError } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';
import { User } from '../../../models/users/user';
import { apiRoutes } from '../../constants/endpoins';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * To store user data into local storage
   * @param user User interface
   */
  storeUserInfo(user: User): void {
    const encodedString = btoa(JSON.stringify(user));
    localStorage.setItem('user', encodedString);
  }

  /**
   * Get all users
   * @param params Query string parameters
   * @returns List of users will be returend
   */
  getUsers(params: object): Observable<User[]> {
    const finalParams = this.generateParams(params);
    return this.httpClient.get<User[]>(environment.apiEndPoint + apiRoutes.getUsers, {
      params: finalParams
    }).pipe(
      catchError(error => throwError(error)),
      map((response: User[]) => response)
    );
  }

  /**
   * Find user by specified key and value
   * @param type search by field
   * @param value search by field value
   * @returns List of users will be returend
   */
  findUserBy(type: string, value: string): Observable<User[]> {
    const params = new HttpParams().set(type, value);
    return this.httpClient.get<User[]>(environment.apiEndPoint + apiRoutes.getUsers, { params }).pipe(
      catchError(error => throwError(error)),
      map((response: User[]) => response)
    );
  }

  /**
   * Delete user from database by id
   * @param id Id field of user
   * @returns Boolean value will be return based on success operation
   */
  deleteUser(id: number): Observable<boolean> {
    const url = `${environment.apiEndPoint}${apiRoutes.deleteUser.replace(':id', id.toString())}`;
    return this.httpClient.delete<boolean>(url).pipe(
      catchError(error => throwError(error)),
      map((response: {}) => (Object.keys(response).length === 0))
    );
  }

  /**
   * Store user into database
   * @param params User fields
   * @returns returns user object if successfully added. In case of error false will be return.
   */
  storeUser(params: object): Observable<User | boolean> {
    return this.httpClient.post<User | boolean>(environment.apiEndPoint + apiRoutes.storeUser, params, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(
      catchError(error => throwError(error)),
      map((response: User) => response?.id ? response : false)
    );
  }

  /**
   * Update user into database
   * @param id Id of the user want to update
   * @param params fields needs to be update
   * @returns returns user object if successfully updated. In case of error false will be return.
   */
  updateUser(id: number, params: object): Observable<User | boolean> {
    const url = `${environment.apiEndPoint}${apiRoutes.updateUser.replace(':id', id.toString())}`;
    return this.httpClient.patch<User | boolean>(url, params, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(
      catchError(error => throwError(error)),
      map((response: User) => response?.id ? response : false)
    );
  }

  /**
   * Helps to generate query params
   * @param params query params
   * @returns returns HttpParams object
   */
  generateParams(params: object): HttpParams {
    let httpParams = new HttpParams();

    Object.keys(params).forEach(item => {
      httpParams = httpParams.append(item, params[item]);
    });

    return httpParams;
  }
}
