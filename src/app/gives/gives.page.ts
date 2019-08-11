import { Component, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GivesService } from '../_services/gives.service';
import { Give, Location } from '../_models';
import { ModalController, NavController, IonSearchbar } from '@ionic/angular';
import { GiveDetailsPage } from './give-details/give-details.page';
import { AuthenticationService } from '../_services/auth.service';
import { NavigationExtras } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-gives',
  templateUrl: 'gives.page.html',
  styleUrls: ['gives.page.scss']
})
export class GivesPage {

  @ViewChild('searchBar') searchBar: IonSearchbar;
  filterLocation: Location;
  filterCategorie: string;
  filterKm = 100;
  toGives: Give[] = [];
  givesSaved: Give[] = [];

  private wishes: Give[] = [];

  get userId(): string {
    return this.authService.currentUserValue._id;
  }

  constructor(private givesService: GivesService,
    private modalCtrl: ModalController,
    private authService: AuthenticationService,
    private navCtrl: NavController) {

    // all object available
    this.givesService.getGives().subscribe((gives) => {
      this.toGives = gives;
      this.givesSaved = gives;
    });
    // wishlist of the user
    this.givesService.getWishes(this.authService.currentUserValue._id).subscribe((gives) => {
      this.wishes = gives;
    });

    this.givesService.getNewGives().subscribe((give) => {
      this.toGives.push(give);
    });
  }

  async openDetailModal(giveModal: Give) {
    let wish = false;
    if (this.wishes.length) {
      wish = this.wishes.find((give) => give._id === giveModal._id) ? true : false;
    }
    const modal = await this.modalCtrl.create({
      component: GiveDetailsPage,
      componentProps: { give: giveModal, isWish: wish }
    });
    return await modal.present();
  }

  addToWishList(give: Give) {
    this.givesService.addToWish(give._id, this.authService.currentUserValue._id).subscribe();
  }

  removeFromWishList(give: Give) {
    this.givesService.unwish(give._id, this.authService.currentUserValue._id).subscribe();
  }

  openChat(give: Give) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        idUser: give.user
      }
    };
    this.navCtrl.navigateForward('/tabs/chat/details', navigationExtras);
  }

  launchSearch() {
    const term = this.searchBar.value;


    if (term === '') {
      this.toGives = this.givesSaved;
    } else {
      this.givesService.search(this.searchBar.value).subscribe(
        (gives) => this.toGives = gives
      );
    }
  }

  locationChanged(location: Location) {
    this.filterLocation = location;
  }

  categorieChanged(cat: string) {
    this.filterCategorie = cat;
  }
}
