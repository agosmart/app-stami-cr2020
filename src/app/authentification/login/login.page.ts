import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import {
  LoadingController,
  AlertController,
  MenuController,
  Events
} from "@ionic/angular";
import { ServiceAppService } from "src/app/services/service-app.service";
import { LoadingService } from "src/app/services/loading.service";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { GlobalvarsService } from "src/app/services/globalvars.service";
import { FCM } from "@ionic-native/fcm/ngx";
import { Router } from "@angular/router";

import { Observable } from "rxjs";
import { UserModel } from "src/app/models/user.model";
import { AuthResponseData } from "src/app/models/auth.response";

// ------------------------------

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  idUser = 0;
  idEtab = 0;
  nameEtab: string;
  mobile: string;
  uid: string;
  token: string;
  isSos = false;
  isActive = false;
  showEye = false;
  loginForm: FormGroup;
  isLoading = false;
  isLogin = true;
  dataDoctorObj: UserModel;

  // ------------- CONSTRUCTOR ----------------------------
  constructor(
    public menuCtrl: MenuController,
    public loading: LoadingService,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private srv: ServiceAppService,
    private router: Router,
    private nat: NativeStorage,
    private sglob: GlobalvarsService,
    private fcm: FCM,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  // --------------------------------------------
  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.loginForm.get("password");
  }
  public errorMessages = {
    username: [
      { type: "required", message: "le nom d'utilisateur est requis" },
      {
        type: "maxlength",
        message: "Votre saisie ne doit pas dépasser 50 caractères."
      },
      {
        type: "minLength",
        message: "Votre saisie doit comporter au moins 3 caractères."
      },
      { type: "pattern", message: "Addresse email non valide" }
    ],
    password: [
      { type: "required", message: "le mot de passe est requis" },
      {
        type: "maxlength",
        message: "Votre saisie ne doit pas dépasser 50 caractères."
      },
      {
        type: "minLength",
        message: "Votre saisie doit comporter au moins 6 caractères."
      }
    ]
  };

  ionViewWillEnter() {
    // disable side-menu
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
          Validators.pattern(
            "^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$"
          )
        ]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3)
          // Validators.pattern('^[A-Za-z]+$')
        ]
      ]
    });
  }

  // ----- Action to Show/Hide icon - Password /Text type

  showEyeIcon() {
    this.showEye = !this.showEye;
  }

  // ------ Api service login ---------------
  submitLogin() {
    this.getUidFcm() == null
      ? (this.uid = "111111111111111111111111")
      : this.getUidFcm();
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Connexion en cours..." })
      .then(loadingEl => {
        loadingEl.present();

        const params = {
          email: this.loginForm.value.username,
          password: this.loginForm.value.password,
          uid: this.uid,
          userType: 3
        };

        console.log("params======>", params);

        const authObs: Observable<AuthResponseData> = this.srv.loginDoctor(
          params
        );
        // ---- Call Login function
        authObs.subscribe(
          // :::::::::::: ON RESULT ::::::::::
          resData => {
            this.isLoading = false;
            // const dataResponse: UserModel = JSON.stringify(resData.data);
            const dataResponse: UserModel = resData.data;
            console.log("Response >>>>> ", resData);
            // ----- Hide loader ------
            loadingEl.dismiss();

            if (+resData.code === 200) {
              this.idUser = dataResponse.id;
              this.mobile = dataResponse.mobile;
              this.token = dataResponse.apiToken;
              this.idEtab = dataResponse.etablissment[0].etabId;
              this.nameEtab = dataResponse.etablissment[0].name;
              this.isSos = dataResponse.enFonction === "1" ? true : false;
              this.isActive =
                dataResponse.disponibleAvis === "1" ? true : false;

              //console.group("::::::: DATA RESPONSE :::::: ");
              console.log("idEtab login===>", this.idEtab);

              //  console.groupEnd();
              // ----- Set storage Data -----
              this.SetStorage(dataResponse);
              // -----  Update id Doctor value -----
              this.sglob.updateInfoUser(
                this.idUser,
                this.token,
                this.idEtab,
                this.nameEtab
              );
              this.sglob.setIsActive(this.isActive);
              this.sglob.setIsSos(this.isSos);
              // ----- Retrive a value of uid -----

              // ----- Toast ------------
              // this.sglob.presentToast(resData.message);
              // ----- Redirection to Home page ------------
              this.dataDoctorObj = dataResponse;
              this.router.navigate([
                "/home",
                JSON.stringify(this.dataDoctorObj)
              ]);
            } else {
              // --------- Show Alert --------
              this.showAlert(resData.message);
            }
          },

          // ::::::::::::  ON ERROR ::::::::::::
          errRes => {
            console.log(errRes);
            // ----- Hide loader ------
            loadingEl.dismiss();
            // --------- Show Alert --------
            if (errRes.error.errors != null) {
              this.showAlert(errRes.error.message);
            } else {
              this.showAlert(
                "Prblème d'accès au réseau, veillez vérifier votre connexion"
              );
            }
          }
        );
      });
  }

  SetStorage(dataResponseVal) {
    console.log("Stored item login !", dataResponseVal),
      this.nat
        .setItem("cardio-cr", {
          dataDoctorObj: dataResponseVal
        })
        .then(
          () => console.log("Stored item!", this.idUser),
          error => console.error("Error storing item", error)
        );
  }

  getUidFcm() {
    this.fcm.getToken().then(uid => {
      console.log("constructeur uid is ::::: ", uid);
      this.uid = uid;
      console.log("uid===>", this.uid);
      // this.srv.adduid(token, this.idUser, this.mobile).then(newsFetched => {
      //   this.ReturnLogin = newsFetched;
      // });
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: " Mot de passe oublié ?",
      message: "Entrez votre adresse e-mail pour récupérer votre mot de passe.",
      cssClass: "alert-css",
      inputs: [
        {
          name: "Email",
          type: "email",
          placeholder: "Email"
        }
      ],
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Confirmer",
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              await this.sglob.presentToast(
                "Un email vous a été envoyé avec votre nouveau mot de passe."
              );
            });
          }
        }
      ]
    });

    await alert.present();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: "Résultat d'authentication",
        message: message,
        cssClass: "alert-css",
        buttons: ["Okay"]
      })
      .then(alertEl => alertEl.present());
  }
}
