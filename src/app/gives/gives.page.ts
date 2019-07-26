import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-gives',
  templateUrl: 'gives.page.html',
  styleUrls: ['gives.page.scss']
})
export class GivesPage implements OnInit {

  toGives: object[] = [];
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;

    // socket.fromEvent('gives/updated').pipe(map( data => data )); // with pipe rxjs6
  }

  ngOnInit() {

    this.socket.on('gives-added', (give) => {
      this.toGives.push(give);
    });
    this.socket.on('gives-updated', (give) => {
      this.toGives.find(give);
    });
  }

}
