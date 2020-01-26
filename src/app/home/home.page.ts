import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  NavController,
  LoadingController,
  MenuController,
  Events,
  Platform,
  AlertController
} from '@ionic/angular';
import { UserModel } from '../models/user.model';
import { GlobalvarsService } from '../services/globalvars.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { ServiceAppService } from '../services/service-app.service';
import { Observable } from 'rxjs';
import { DoctorStatusResponse, DoctorStatusModel } from '../models/doctor.status.response';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  isSos: boolean;
  isActive: boolean;

  idUser: number;
  idEtab: number;
  token: string;
  nameEtab: string;

  fullName: string;
  dataDoctor: UserModel;
  gender: number;


  // intr: any;
  // notif = 0;

  constructor(

    private srv: ServiceAppService,
    private sglob: GlobalvarsService,
    private loadingCtrl: LoadingController,
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

    // ++++++++++++++++++ GET STORED DTATA ++++++++++++++++++++++++
    this.idUser = this.sglob.getIdUser();
    this.idEtab = this.sglob.getidEtab();
    this.token = this.sglob.getToken();
    this.nameEtab = this.sglob.getNameEtab();


    this.isActive = this.sglob.getIsActive();
    this.isSos = this.sglob.getIsSos();
    console.group(':::::::  HOME :::::: ');
    console.log('isSos HOME===>', this.isSos);
    console.log('isActive HOME===>', this.isActive);
    console.log('idDoctor Etab HOME===>', this.idUser);
    console.groupEnd();



    /* this.platform.ready().then(() => {
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


    //  this.initInt();

  }

  // ++++++++++++++++++ START DTATA FORM ++++++++++++++++++++++++
  get activity() {
    return this.formDoctor.get('activity');
  }
  get sos() {
    return this.formDoctor.get('sos');
  }
  formDoctor = this.formBuilder.group({
    // activity: ['false', [Validators.pattern]]
    activity: ['', ''],
    sos: [{ value: true, disabled: true }, [Validators.required]]
  });


  // -------- SIMULATE NOTIFICATON ----------
  /*  initInt() {
      const thisIs = this;
      thisIs.intr = setInterval(
        function () {
          console.log('setInterval -> notif ::: ', thisIs.notif)
          if (thisIs.notif < 10) {
            thisIs.notif++;
          } else {
            thisIs.stopInit();
          }
        }, 2000
      );
  
      return thisIs.intr;
    }
  
    stopInit() {
      this.notif = 0;
      clearInterval(this.intr);
      console.log('stopInit() ::: -> notif ', this.notif)
    }
  */
  // --------------------------------------------

  ionViewDidEnter() {

  }

  ionViewWillEnter() {
    // ----- ENABLE MenuSide ----------
    this.menuCtrl.enable(true);


  }

  ngOnInit() {


    this.activatedroute.paramMap.subscribe(paramMap => {

      console.log('paramMap===>', paramMap);
      if (!paramMap.has('dataDoctorObj')) {

        /* =============  Redirection to Home =================*/
        this.router.navigate(['/login']);
        /* =========================================== */

      } else {
        this.dataDoctor = JSON.parse(paramMap.get('dataDoctorObj'));
        console.log(' Data Doctor From Login:::', this.dataDoctor);
        this.gender = this.dataDoctor.gender;
        this.fullName = this.dataDoctor.lastName + ' ' + this.dataDoctor.firstName;

        // # Parse Doctor full name to componentApp to ezt it in Menu-side
        const user = {
          fullName: this.fullName, gender: this.gender
        };
        this.updateMenuUserData(user);


      }
    });
  }

  /** ++++++++++++++++++ SUBMIT FORM ++++++++++++++++++++++++
   * submitform
   */
  public submitform() {
    this.router.navigate(['/dossiers']);
  }

  /** ++++++++++++++++++ UDATE MENU-SIDE FullName From AppComponent.ts ++++++++++++++++++++++++
   * updateMenuFullName
   */
  public updateMenuUserData(user: any) {
    console.log('User created!');
    this.events.publish('user:created', user);
  }


  // changeFuncWorking(event: any) {
  //   if (!this.isActive) {
  //     event.stopImmediatePropagation();
  //     event.stopPropagation();
  //     event.preventDefault();

  //     this.asyncService.someAsyncFunc().subscribe((data) => {
  //       if (data){ this.isActive = true; }
  //     });
  //   } else {
  //     setTimeout(() => { this.isActive = false; });
  //   }
  // }
  /**  ++++++++++++++++++ State doctor [if he is in Activity]  ++++++++++++++++++
   * onActiveStateChange
   */
  onActiveStateChange(isActive: any, event: any) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();

    this.isActive = !isActive;
    console.log('value of :::: isActive :::', this.isActive);
    if (this.isActive) { this.isSos = true; }
    // this.sglob.setIsActive(this.isActive);
    // TODO :: Update a value of (isActive) in databes via service
    this.onUpdateStateDoctor();
  }

  /** ++++++++++++++++++ State doctor [if he can get SOS Notification] ++++++++++++++++++
   * onSosStateChange
   */
  onSosStateChange(isSos: any, event: any) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
    this.isSos = !isSos;
    console.log('value of :::: isSos :::', this.isSos);

    // TODO :: Update a value of (isSos) in databes via service
    this.onUpdateStateDoctor();
  }

  // ++++++++++++++++++ Update stat of Doctor if he is [ Active || can get SOS Notification ] ++++++++++++++++++

  private onUpdateStateDoctor() {

    this.loadingCtrl.create({ keyboardClose: true, message: 'Chargement en cours...' })
      .then(loadingEl => {

        loadingEl.present();
        const idDoctor = this.idUser;

        const params = {
          available: this.isActive ? '1' : '0',
          advice: this.isSos ? '1' : '0',
        };

        console.group('::::::: DATA onUpdateStateDoctor Func :::::: ');
        console.log('this.isActive ::::::::', this.isActive);
        console.log('this.isSos :::::::::::: ', this.isSos);
        console.log('params >>>>> ', params);
        console.groupEnd();

        const authObs: Observable<DoctorStatusResponse> = this.srv.updateDoctorState(
          params,
          idDoctor,
          this.token,
        );


        authObs.subscribe(
          resData => {
            const dataResponse: DoctorStatusModel = resData.data;
            if (+resData.code === 200) {
              // ----- Hide loader ------
              loadingEl.dismiss();

              console.group('::::::: DATA Observable RESULT :::::: ');
              console.log('dataResponse.enFonction  ::::::::', dataResponse.enFonction);
              console.log('typeof (dataResponse.enFonction)  ::::::::', typeof (dataResponse.enFonction));
              console.log('dataResponse.disponibleAvis :::::::::::: ', dataResponse.disponibleAvis);
              console.groupEnd();


              // - UPDATE GLOBAL VARIABLES
              const isActive = +dataResponse.enFonction ? true : false;
              const isSos = +dataResponse.disponibleAvis ? true : false;

              this.sglob.setIsActive(isActive);
              this.sglob.setIsSos(isSos);

            } else {
              // ----- Hide loader ------
              loadingEl.dismiss();
              // --------- Show Alert --------
              this.sglob.showAlert('Erreur!', resData.message);
            }
          },
          errData => {
            console.log('ERROR :::', errData);
            // ----- Hide loader ------
            loadingEl.dismiss();
            // --------- Show Alert --------
            if (errData.error.errors != null) {
              this.sglob.showAlert('Erreur!', errData.error.message);
            } else {
              this.sglob.showAlert('Erreur!', 'Prblème d\'accès au réseau, veillez vérifier votre connexion'
              );
            }
          });

      });

  }


  /*
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
    }*/

  // -------------------------------
}


