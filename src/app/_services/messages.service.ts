import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { RestApiService } from './rest-api.service';
import { Injectable } from '@angular/core';
import { Message } from '../_models';

@Injectable({
    providedIn: 'root'
})

export class MessagesService {
    private socket: Socket;

    constructor(socket: Socket, public api: RestApiService) {
        this.socket = socket;
    }

    public getMessages(idUser: string): Observable<Array<Message>> {
        return this.api.getMessages(idUser);
    }

    public getMessagesBetweenUsers(idUser: string, idUser2: string): Observable<Array<Message>> {
        return this.api.getMessagesBetweenUsers(idUser, idUser2);
    }

    public getNewMessages(idUser: string): Observable<Message> {
        return new Observable<Message>((observer) => {
            this.socket.on('messages-added' + idUser, (message: Message) => {
                observer.next(message);
            });
        });
    }

    public getUpdatedMessages(idUser: string): Observable<Message> {
        return new Observable<Message>((observer) => {
            this.socket.on('messages-updated', (message: Message) => {
                observer.next(message);
            });
        });
    }

    public getDeletedMessages(idUser: string): Observable<Message> {
        return new Observable<Message>((observer) => {
            this.socket.on('messages-deleted', (message) => {
                observer.next(message);
            });
        });
    }

    public sendMessage(message: Message): Observable<Message> {
        return this.api.sendMessage(message);
    }
}
