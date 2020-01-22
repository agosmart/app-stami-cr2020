import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  NavController,
  LoadingController,
  MenuController,
  Events,
  Platform,
  AlertController
} from "@ionic/angular";
import { UserModel } from "../models/user.model";
import { GlobalvarsService } from "../services/globalvars.service";
import { FCM } from "@ionic-native/fcm/ngx";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  isActive = false;
  isSos = false;
  nameEtab: string;
  fullName: string;
  dataDoctor: UserModel;
  gender: number;

  constructor(
    private sglob: GlobalvarsService,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    public navcrtl: NavController,
    private alertCtrl: AlertController,
    private router: Router,
    private activatedroute: ActivatedRoute,
    public events: Events,
    private platform: Platform,
    private fcm: FCM
  ) {
    this.platform.ready().then(() => {
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          //Notification was received on device tray and tapped by the user.
          console.log("ok", JSON.stringify(data));
          console.log("Nothing idDossier", JSON.stringify(data.idDossier));
          console.log("Nothing page", JSON.stringify(data.etabName));
          // this.router.navigate(["/" + data.page]);
          this.onNotifReceived(data);
        } else {
          //Notification was received in foreground. Maybe the user needs to be notified.
          console.log("Nothing data", JSON.stringify(data));
          console.log("Nothing idDossier", JSON.stringify(data.idDossier));
          console.log("Nothing page", JSON.stringify(data.etabName));
          //this.router.navigate(["/" + data.page]);
          this.onNotifReceived(data);
        }
      });
    });
  }

  get activity() {
    return this.formDoctor.get("activity");
  }
  get sos() {
    return this.formDoctor.get("sos");
  }

  formDoctor = this.formBuilder.group({
    // activity: ['false', [Validators.pattern]]
    activity: ["", ""],
    sos: ["", ""]
  });

  // --------------------------------------------

  // ----------------------------------------------

  // ionViewDidEnter() {
  //   this.isActive = this.sglob.getIsActive();
  //   this.isSos = this.sglob.getIsSos();

  //   console.log('isSos HOME===>', this.isSos);
  //   console.log('isActive HOME===>', this.isActive);
  // }
  ionViewWillEnter() {
    // Enable side-menu
    this.menuCtrl.enable(true);
  }
  ngOnInit() {
    this.isActive = this.sglob.getIsActive();
    this.isSos = this.sglob.getIsSos();
    this.nameEtab = this.sglob.getNameEtab();

    console.log("isSos HOME===>", this.isSos);
    console.log("isActive HOME===>", this.isActive);

    this.activatedroute.paramMap.subscribe(paramMap => {
      console.log("paramMap===>", paramMap);
      if (!paramMap.has("dataDoctorObj")) {
        /* ========================================
                  Redirection to Home
       =========================================== */
        this.router.navigate(["/login"]);
      } else {
        this.dataDoctor = JSON.parse(paramMap.get("dataDoctorObj"));
        console.log(" Data Doctor From Login:::", this.dataDoctor);
        this.gender = this.dataDoctor.gender;
        this.fullName =
          this.dataDoctor.lastName + " " + this.dataDoctor.firstName;

        // # Parsse Doctor full name to componentApp to ezt it in Menu-side
        this.createUser(this.fullName);

        // this.isActive = false;
        // this.isSos = true;
      }
    });
  }

  submitform() {
    this.router.navigate(["/dossiers"]);
  }
  //////////////////////////
  createUser(user) {
    console.log("User created!");
    this.events.publish("user:created", user);
  }

  onActiveStateChange(isActive: boolean) {
    // this.formDoctor.get('activity').setValue(this.isActive);
    this.isActive = !isActive;
    console.log("value of :::: isActive :::", this.isActive);
    this.sglob.setIsActive(this.isActive);
    // TODO :: Update a value of (isActive) in databes via service
  }

  onSosStateChange(isSos: boolean) {
    this.isSos = !isSos;
    console.log("value of :::: isSos :::", this.isSos);
    // this.formDoctor.get('sos').setValue(this.isSos);
    this.sglob.setIsSos(this.isSos);
    // TODO :: Update a value of (isSos) in databes via service
  }

  async onNotifReceived(data) {
    console.log("onNotifReceived data ==>", data);
    console.log("onNotifReceived etabname  ==>", JSON.stringify(data.etabName));
    const etabName = JSON.stringify(data.etabName);
    // console.log("onNotifReceived etab name point ==>", data.etabName);
    // -----------END  message dynamic ---------------
    const alert = await this.alertCtrl.create({
      header: "Résultat d'authentication",
      message:
        "vos avez reçu une demande d`avis medicale provenant du centre cudt" +
        etabName,
      cssClass: "alert-css",
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirme Annuler");
          }
        },
        {
          text: "Je consulte",
          handler: async () => {
            this.router.navigate([
              "/dossier-infos",
              JSON.stringify(data.idDossier)
            ]);
          }
        }
      ]
    });
    await alert.present();
  }
}

/*

{
    "code": "200",
    "message": "Authentification réussie, bienvenus Docteur",
    "data": {
        "id": 61,
        "lastName": "Mohamed",
        "firstName": "Mouallem",
        "gender": "2",
        "birthDay": "1990-05-08",
        "birthDayFr": "08-05-1990",
        "age": 29,
        "email": "enafor99@gmail.com",
        "mobile": "0560114488",
        "uid": "115599775533225588445566",
        "apiToken": "88W7AMW58FX4S6gUY0AcdHO7QEmftTav2UuhG9mW0Qu9vvMMAiFNqexJjfTJ",
        "enFonction": null,
        "disponibleAvis": null,
        "etablissment": [
            {
                "etabId": 5,
                "longitude": "0.80000000",
                "latitude": "1.10000000"
            }
        ]
    }
}

*/
