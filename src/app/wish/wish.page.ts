import { Component, OnInit } from '@angular/core';
import { Give } from '../_models';
import { GivesService } from '../_services/gives.service';
import { AuthenticationService } from '../_services/auth.service';

@Component({
  selector: 'app-wish',
  templateUrl: 'wish.page.html',
  styleUrls: ['wish.page.scss']
})
export class WishPage implements OnInit {
  wishes: Give[] = [];

  constructor(private givesService: GivesService,
    private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.givesService.getWishes(this.authService.currentUserValue._id).subscribe((gives) => {
      this.wishes = gives;
    });
    // TODO Ajout des sockets de mise à jour de la liste des wishes
    // this.socket.on('gives-updated', (give) => {
    //   this.toGives.find(give);
    // });
  }


  test(give: Give) {
    this.givesService.unwish(this.authService.currentUserValue._id, give._id).subscribe();
  }

}
