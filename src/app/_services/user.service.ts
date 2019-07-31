import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { RestApiService } from './rest-api.service';
import { Observable } from 'rxjs';
import { Give } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {

    private socket: Socket;

    constructor(socket: Socket, public api: RestApiService) {
        this.socket = socket;
    }
}
