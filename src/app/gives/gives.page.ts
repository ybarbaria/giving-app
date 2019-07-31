import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GivesService } from '../_services/gives.service';
import { Give } from '../_models';
import { ModalController } from '@ionic/angular';
import { GiveDetailsPage } from './give-details/give-details.page';
@Component({
  selector: 'app-gives',
  templateUrl: 'gives.page.html',
  styleUrls: ['gives.page.scss']
})
export class GivesPage implements OnInit {

  toGives: Give[] = [];
  private socket: Socket;
  private detailsModal;

  constructor(socket: Socket,
    private givesService: GivesService,
    private modalCtrl: ModalController, ) {
    this.socket = socket;
  }

  ngOnInit() {
    this.givesService.getGives().subscribe((gives) => {
      this.toGives = gives;
    });

    this.givesService.getNewGives().subscribe((give) => {
      this.toGives.push(give);
    });
    // this.socket.on('gives-updated', (give) => {
    //   this.toGives.find(give);
    // });
  }

  async openDetailModal(idGive: string) {
    const selectedGive = this.toGives.find((give) => {
      return give._id === idGive;
    });
    const modal = await this.modalCtrl.create({
      component: GiveDetailsPage,
      componentProps: { give: selectedGive }
    });
    return await modal.present();
  }
}
