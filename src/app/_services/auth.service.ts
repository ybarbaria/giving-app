import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from '../_models';
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    private apiURL = 'https://sleepy-thicket-33930.herokuapp.com'; // TODO gérer l'url dans le fichier de config
    //private apiURL = 'http://localhost:8080';
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private socket: Socket) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(mail: string, password: string) {
        return this.http.post<User>(`${this.apiURL}/users/authenticate`, { mail, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.socket.removeAllListeners();
        this.socket.disconnect();
    }

    register(userRegister: User): Observable<User> {
        return this.http.post<User>(`${this.apiURL}/users/register`, userRegister).pipe(
            map((user: User) => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    // await this.storage.set("ACCESS_TOKEN", res.user.access_token);
                    // await this.storage.set("EXPIRES_IN", res.user.expires_in);
                    this.currentUserSubject.next(user);
                }
                return user;
            })

        );
    }
}
