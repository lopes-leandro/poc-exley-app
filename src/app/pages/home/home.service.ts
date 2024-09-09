import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

type User = {
  id: number,
  name: string,
  createdAt: string
}
type UserApi = {
  userId: number,
  name: string,
  createdAt: string
}

@Injectable()
export class HomeService {

  private readonly http = inject(HttpClient);

  constructor() { }

  getUsers(): Observable<User[]> {
    return this.http.get<UserApi[]>('/assets/fake-data/users.json')
      .pipe(
        map(
          (m) => this.fromApi(m)
        ));
  }

  private fromApi(userApi: UserApi[]): User[] {
    return userApi.map((apiUser) => (
      {
        id: apiUser.userId,
        name: apiUser.name,
        createdAt: apiUser.createdAt
      }
    ));
  }

}
