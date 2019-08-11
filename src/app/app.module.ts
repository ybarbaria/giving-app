import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { LoginComponent } from './auth/login/login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { TabsService } from './tabs/tabs.service';
import { AuthInterceptor } from './_interceptor/auth.interceptor';
import { ComponentsModule } from './components/components.module';
import { ChatChannelComponent } from './components/chat-channel/chat-channel.component';
import { AutocompleteLocationComponent } from './components/autocomplete-location/autocomplete-location.component';

const config: SocketIoConfig = {
  url: 'http://192.168.43.19:8080', options: {
    query: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDE4NDJkMDE2NzAwYzU0NDRlYTU4MjgiLCJpYXQiOjE1NjMzNDkxMzh9.hVGgDk3wZTl5XUuX0goz2yE-2uIh9f75X8Kie2g7qCc'
  }
};

@NgModule({
  declarations: [AppComponent, LoginComponent],
  entryComponents: [ChatChannelComponent, AutocompleteLocationComponent],
  imports: [BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SocketIoModule.forRoot(config)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    File,
    WebView,
    FilePath,
    Facebook,
    TabsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
