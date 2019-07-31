import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GivesService } from '../_services/gives.service';
import { Give } from '../_models';
import { ModalController } from '@ionic/angular';
import { GiveDetailsPage } from './give-details/give-details.page';
import { AuthenticationService } from '../_services/auth.service';
@Component({
  selector: 'app-gives',
  templateUrl: 'gives.page.html',
  styleUrls: ['gives.page.scss']
})
export class GivesPage implements OnInit {

  toGives: Give[] = [];
  private socket: Socket;
  private wishes: Give[] = [];

  constructor(socket: Socket,
    private givesService: GivesService,
    private modalCtrl: ModalController,
    private authService: AuthenticationService) {
    this.socket = socket;
  }

  ngOnInit() {
    // all object available 
    this.givesService.getGives().subscribe((gives) => {
      this.toGives = gives;
    });
    // wishlist of the user
    this.givesService.getWishes(this.authService.currentUserValue._id).subscribe((gives) => {
      this.wishes = gives;
    });

    this.givesService.getNewGives().subscribe((give) => {
      this.toGives.push(give);
    });


    // this.socket.on('gives-updated', (give) => {
    //   this.toGives.find(give);
    // });
  }

  async openDetailModal(giveModal: Give) {
    let wish = false
    if (this.wishes.length) {
      wish = this.wishes.find((give) => give._id === giveModal._id) ? true : false;
    }
    const modal = await this.modalCtrl.create({
      component: GiveDetailsPage,
      componentProps: { give: giveModal, isWish: wish }
    });
    return await modal.present();
  }
}
