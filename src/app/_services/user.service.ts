import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { RestApiService } from './rest-api.service';
import { Observable } from 'rxjs';
import { Give, User } from '../_models';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Injectable({ providedIn: 'root' })
export class UserService {

    private socket: Socket;

    constructor(socket: Socket,
        public api: RestApiService,
        private fb: Facebook) {
        this.socket = socket;
    }

    getUser(idUser: string): Observable<User> {
        return this.api.getUser(idUser);
    }
}
