import { Component } from '@angular/core';

import { AuthenticationService } from './_services/auth.service';
import { User } from './_models';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TabsService } from './tabs/tabs.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  currentUser: User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    public tabs: TabsService
  ) {
    this.initializeApp();
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
