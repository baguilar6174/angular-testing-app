import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { User } from '@data/interfaces/user.metadata';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(
    data: {
      email: string,
      password: string;
    }
  ): Observable<{
    error: boolean,
    msg: string,
    data: any,
  }> {
    const response = { error: true, msg: '', data: null };
    return this.httpClient.get<any>(`${environment.api}/users`)
      .pipe(
        map((r: User[]) => {
          const user: any = r.find((u: User) : boolean => (u.email == data.email && u.password == data.password) );
          response.msg = user ? `Succes Login`: `Failed Login`;
          response.error = false;
          response.data = user ? user : null;
          return response;
        }),
        catchError(e => {
          // console.log('Error', e);
          let message = 'Error to login';
          response.msg = message;
          return of(response);
        })
      );
  }

}
