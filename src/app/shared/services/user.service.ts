import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

import {User} from '../models/user.model';

@Injectable()

export class UserService {
    constructor(public http: HttpClient) {
    }

    getUserByEmail(email: string): Observable<any> {
        return this.http.get(`http://localhost:3004/users?email=${email}`)
            .pipe(
                map((response) => {
                    return response;
                }),
                map((user: User) => user[0] ? user[0] : undefined)
            );
    }

    createNewUser(user: User): Observable<any> {
        return this.http.post(`http://localhost:3004/users`, user)
            .pipe(
                map((response) => {
                    return response;
                })
            );
    }
}