import { Component, enableProdMode } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

//enableProdMode();

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
      url: '/onboard-demo',
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
      title: 'Deconnexion',
      url: '/login',
      // direct: 'root',
      icon: 'log-out'
    },


  ];


  // -------------------------------------
  doctorName = '';
  gender = 0;
  avatar = 'men.png';
  // -------------------------------------

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public events: Events,

  ) {
    this.initializeApp();

    this.updateMenuUserFullName();
    /*
    this.events.subscribe('user:created', (user) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('AppComponent :: Welcome Dr::::::', user);
      this.doctorName = user;
    });
    */
  }

  updateMenuUserFullName() {

    this.events.subscribe('user:created', (user) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('AppComponent :::::::', user);
      this.doctorName = user.fullName;
      this.gender = user.gender;
      +this.gender === 2 ? this.avatar = 'men.png' : this.avatar = 'women.png';
    });
  }

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

    this.router.navigate(['/login']);
  }


}


