import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from '../_models';
import { Socket } from 'ngx-socket-io';
import { FacebookLoginResponse, Facebook } from '@ionic-native/facebook/ngx';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;

    // private apiURL = 'https://sleepy-thicket-33930.herokuapp.com'; // TODO gérer l'url dans le fichier de config
    private apiURL = 'http://192.168.43.19:8080';
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
        private socket: Socket,
        public fb: Facebook) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string, facebook = false) {
        return this.http.post<User>(`${this.apiURL}/users/authenticate`, { email, password })
            .pipe(map(user => {
                // login succPessful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep
                    // user logged in between page refreshes
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

    register(userRegister: User, facebook = false): Observable<User> {
        const uri = !facebook ? `${this.apiURL}/users/register` : `${this.apiURL}/users/authenticate/facebook`;
        return this.http.post<User>(uri, userRegister).pipe(
            map((user: User) => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user
                    // logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            })
        );
    }

    loginWithFacebook(): Observable<User> {
        // Login with permissions
        return new Observable((observer) => {

            this.fb.login(['public_profile', 'email'])
                .then((res: FacebookLoginResponse) => {
                    // The connection was successful
                    if (res.status === 'connected') {
                        // Get user infos from the API
                        this.fb.api('/me?fields=first_name,last_name,email', []).
                            then((user: { first_name: any; last_name: any; email: any; }) => {
                                // Get the connected user details
                                const firstName = user.first_name;
                                const lastName = user.last_name;
                                const email = user.email;
                                const userFacebook = {
                                    email,
                                    firstName,
                                    lastName,
                                    type: 'facebook'
                                };
                                this.register(userFacebook as User, true).subscribe(
                                    (userLogged) => {
                                        observer.next(userLogged);
                                    },
                                    (err) => {
                                        observer.next(err);
                                    }
                                );
                            });
                    }
                })
                .catch((e: any) => {
                    observer.next(e);
                });
        });
    }
}
