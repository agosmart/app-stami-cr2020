import { Component, OnInit } from "@angular/core";
import { FCM } from "@ionic-native/fcm/ngx";
import { Platform } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-test-fcm",
  templateUrl: "./test-fcm.page.html",
  styleUrls: ["./test-fcm.page.scss"]
})
export class TestFcmPage implements OnInit {
  constructor(
    private fcm: FCM,
    private platform: Platform,
    private router: Router
  ) {
    // this.fcm.getToken().then(token => {
    //   // Your best bet is to here store the token on the user's profile on the
    //   // Firebase database, so that when you want to send notifications to this
    //   // specific user you can do it from Cloud Functions.
    //   console.log("token ", token);
    // });
    // platform.ready().then(() => {
    //   fcm.onNotification().subscribe(data => {
    //     if (data.wasTapped) {
    //       //Notification was received on device tray and tapped by the user.
    //       console.log("ok", JSON.stringify(data));
    //       console.log("Nothing idDossier", JSON.stringify(data.idDossier));
    //       console.log("Nothing page", JSON.stringify(data.etabName));
    //       // this.router.navigate(["/" + data.page]);
    //       this.onNotifReceived(data);
    //     } else {
    //       //Notification was received in foreground. Maybe the user needs to be notified.
    //       console.log("Nothing data", JSON.stringify(data));
    //       console.log("Nothing idDossier", JSON.stringify(data.idDossier));
    //       console.log("Nothing page", JSON.stringify(data.etabName));
    //       //this.router.navigate(["/" + data.page]);
    //       this.onNotifReceived(JSON.stringify(data));
    //     }
    //   });
    // });
  }

  ngOnInit() {}

  async onNotifReceived(data) {
    // // -----------END  message dynamic ---------------
    // const alert = await this.alertCtrl.create({
    //   header: "Résultat d'authentication",
    //   message:
    //     "vos avez reçu une demande d`avis medicale provenant du centre cudt" +
    //     data.etabName,
    //   cssClass: "alert-css",
    //   buttons: [
    //     {
    //       text: "Annuler",
    //       role: "cancel",
    //       cssClass: "secondary",
    //       handler: () => {
    //         console.log("Confirme Annuler");
    //       }
    //     },
    //     {
    //       text: "Je consulte",
    //       handler: async () => {
    //         this.router.navigate(["/dossier-infos", data.idDossier]);
    //       }
    //     }
    //   ]
    // });
    // await alert.present();
  }
}
