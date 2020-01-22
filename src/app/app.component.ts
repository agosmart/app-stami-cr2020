import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {



  public appPages = [

    {
      title: 'A propos',
      url: '/about',
      //direct: 'forward',
      icon: 'help-circle-outline'
    },
    {
      title: 'Intro app',
      url: '/onboard',
      // direct: 'forward',
      icon: 'information-circle-outline'
    },

    {
      title: 'Prefrences',
      url: '/settings',
      // direct: 'forward',
      icon: 'switch',
      // icon: 'cog'
    },
    {
      title: 'Deconexion',
      url: '/',
      // direct: 'root',
      icon: 'log-out'
    },


  ];


  // myName = '1000';
  // countChange(event) {
  //   this.myName = event;
  //   console.log('this.myName  app ===>', this.myName);
  // }
  doctorName = '';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public events: Events

  ) {
    this.initializeApp();
    //this.createUser(this.doctorName);

    this.events.subscribe('user:created', (user) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome::::::::::::::::::::::::', user);
      this.doctorName = user;
    });
  }


  // createUser(user:any) {
  //   this.events.subscribe('user:created', (user) => {
  //     // user and time are the same arguments passed in `events.publish(user, time)`
  //     console.log('Welcome::::::::::::::::::::::::', user);
  //     this.doctorName = user;
  //   });
  // }

  initializeApp() {
    this.platform.ready().then(() => {

      // this.router.events.subscribe((event: any) => {
      //   this.name = event.name;
      //   console.log('moh!!!!!!!', event);
      //   console.log('id!!!!!!!', event.id);
      // });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }


  logout() {
    this.router.navigate(['/']);
  }


}


