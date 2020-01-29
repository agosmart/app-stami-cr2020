import { Component, OnInit } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { MenuController, AlertController, NavController, Events, Platform } from '@ionic/angular';
import { GlobalvarsService } from 'src/app/services/globalvars.service';
import { ServiceAppService } from 'src/app/services/service-app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {


  intr: any;
  notif = 0;


  constructor(

    private srv: ServiceAppService,
    private sglob: GlobalvarsService,

    public menuCtrl: MenuController,

    public navcrtl: NavController,
    private alertCtrl: AlertController,
    private router: Router,

    public events: Events,
    private platform: Platform,
    private fcm: FCM
  ) {

    /*  this.platform.ready().then(() => {
        // +++++++++++++ Envoked when Doctor recive Notification  ++++++++++++
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            // Notification was received on device tray and tapped by the user.
            console.log('ok', JSON.stringify(data));
            console.log('Nothing idDossier', JSON.stringify(data.idDossier));
            console.log('Nothing page', JSON.stringify(data.etabName));

            this.onNotifReceived(data);
          } else {
            // Notification was received in foreground. Maybe the user needs to be notified.
            console.log('Nothing data', JSON.stringify(data));
            console.log('Nothing idDossier', JSON.stringify(data.idDossier));
            console.log('Nothing page', JSON.stringify(data.etabName));

            this.onNotifReceived(data);

          }

        });
      });*/
    // ----------------------------------------

  }


  ionViewDidEnter() {

  }
  ionViewWillEnter() {

  }
  ngOnInit() {
    this.notif = 0;
    /*
    this.initInt();

    */
  }


  listWaitingNotifFromCudt(event: any) {

    console.log(' :::::::::: listWaitingNotifFromCudt :::::::');
    // #TODO: this.srv.listWaitingNotifFromCudt();

  }
  // -------- SIMULATE NOTIFICATON ----------
  initInt() {
    const thisIs = this;
    thisIs.intr = setInterval(
      () => {
        console.log('setInterval -> notif ::: ', thisIs.notif);
        if (thisIs.notif < 10) {
          thisIs.notif++;
        } else {
          thisIs.stopInit();
        }
      }, 10000
    );

    return thisIs.intr;
  }

  stopInit() {
    this.notif = 0;
    clearInterval(this.intr);
    console.log('stopInit() ::: -> notif ', this.notif);
  }





  /*
    onGetNoTification() { }
    // --------------------------------------------

    // -------------------------------
    async onNotifReceived(data: any) {
      console.log('onNotifReceived data ==>', data);
      console.log('onNotifReceived etabname  ==>', JSON.stringify(data.etabName));
      const etabName = JSON.stringify(data.etabName);
      // console.log("onNotifReceived etab name point ==>", data.etabName);
      // -----------END  message dynamic ---------------
      const alert = await this.alertCtrl.create({
        header: 'Résultat d\'authentication',
        message:
          'vos avez reçu une demande d`avis medicale provenant du centre CUDT ' +
          etabName,
        cssClass: 'alert-css',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirme Annuler');
            }
          },
          {
            text: 'Consulter le dossier',
            handler: async () => {
              this.router.navigate([
                '/dossier-infos',
                JSON.stringify(data.idDossier)
              ]);
            }
          }
        ]
      });
      await alert.present();
    }
    */
  // -------------------------------

}
