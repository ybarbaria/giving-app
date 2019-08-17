import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { RestApiService } from './rest-api.service';
import { Injectable } from '@angular/core';
import { Give, Address } from '../_models';

@Injectable({
    providedIn: 'root'
})

export class GivesService {
    private socket: Socket;

    constructor(socket: Socket, public api: RestApiService) {
        this.socket = socket;
    }

    public search(location?: Address, distanceMax?: number, term?: string): Observable<Array<Give>> {
        return this.api.search(location, term, distanceMax);
    }

    public getGives(): Observable<Array<Give>> {
        return this.api.getGives();
    }

    public getWishes(idUser: string): Observable<Array<Give>> {
        return this.api.getWishes(idUser);
    }

    public getNewGives(): Observable<Give> {
        return new Observable((observer) => {
            this.socket.on('gives-added', (give) => {
                observer.next(give);
            });
        });
    }

    public addToWish(idGive: string, idUser: string) {
        return this.api.wish(idUser, idGive);
    }

    public unwish(idGive: string, idUser: string) {
        return this.api.unwish(idUser, idGive);
    }

    public create(give: Give) {
        return this.api.createGive(give);
    }
}
