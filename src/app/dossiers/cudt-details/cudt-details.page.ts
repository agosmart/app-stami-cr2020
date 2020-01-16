import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { DossierModel } from 'src/app/models/dossier.model';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GlobalvarsService } from 'src/app/services/globalvars.service';
import { ServiceAppService } from 'src/app/services/service-app.service';
import { DossierResponseData } from 'src/app/models/dossier.response';
import { DossiersCudtCrResponseData } from 'src/app/models/dossies.cudt.cr.response';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cudt-details',
  templateUrl: './cudt-details.page.html',
  styleUrls: ['./cudt-details.page.scss'],
})
export class CudtDetailsPage implements OnInit {
  idUser: number;
  idEtab: number;
  token: string;

  cudtId: number;
  dataDossiers: any;
  dossiersEnCours = true;
  dossiersEnvoyes = false;
  dataDossiersSending: Array<any>;
  dataDossiersPending: Array<any>;
  lnPending = 0;
  lnSending = 0;



  constructor(

    private srv: ServiceAppService,
    private sglob: GlobalvarsService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.idUser = this.sglob.getIdUser();
    this.idEtab = this.sglob.getidEtab();
    this.token = this.sglob.getToken();
    console.log('constructor => getidEtab', this.idEtab);
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter => getidEtab', this.idEtab);
    this.initWaitingSendingDossiers();
  }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(paramMap => {

      if (!paramMap.has('etabId')) {
        this.router.navigate(['/home']);
      } else {
        this.cudtId = +paramMap.get('etabId');
      }
    });
  }


  segmentButtonClicked(value) {
    console.log('Segment button clicked', value);
    if (value === 'dEnCours') {
      this.dossiersEnCours = true;
      this.dossiersEnvoyes = false;

      console.log('dossiersEnCours 1:::', this.dossiersEnCours);
      console.log('dossiersEnvoyes 1:::', this.dossiersEnvoyes);
    } else {
      this.dossiersEnCours = false;
      this.dossiersEnvoyes = true;

      console.log('dossiersEnCours 2 :::', this.dossiersEnCours);
      console.log('dossiersEnvoyes 2:::', this.dossiersEnvoyes);
    }

  }

  initWaitingSendingDossiers() {
    console.log('initWaitingSendingDossiers() ::::: waiting - Sending list ::::');
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Chargement en cours...' })
      .then(loadingEl => {
        loadingEl.present();
        // ----------- END PARAMS  ---------------
        //const crId = 1;

        // const authObs: Observable<any> = this.http.get<any>('assets/dossiers-cudt.json');
        const authObs: Observable<DossiersCudtCrResponseData> = this.srv.getDossiersCudtCr(this.cudtId , this.token);

        authObs.subscribe(
          res => {
            if (+res.code === 200) {
              loadingEl.dismiss();
              this.dataDossiers = res.data;
              this.dataDossiersSending = res.data.sending;
              this.dataDossiersPending = res.data.pending;

              this.lnPending = this.dataDossiersPending.length;
              this.lnSending = this.dataDossiersSending.length;

              console.log('this.dataDossiers : ', this.dataDossiers);

              console.log('this.dataDossiers[encours] : ', this.dataDossiersPending.length);
              console.log('this.dataDossiers[envoyee] : ', this.dataDossiersSending.length);
            } else {
              console.log('Internal ERROR !');
            }

          },
          errRes => {
            console.log(errRes);
            // ----- Hide loader ------
            loadingEl.dismiss();

            // --------- Show Alert --------
            if (errRes.error.errors != null) {
              this.showAlert(errRes.error.errors.email);
            } else {
              this.showAlert(
                'Prblème d\'accès au réseau, veillez vérifier votre connexion'
              );
            }

          });
      });
  }


  getDossier(dossierId) {
    console.log('get Dossier : dossierId ==== >', dossierId);
    this.router.navigate(['dossier-info', dossierId]);

  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Résultat d\'authentication',
        message: message,
        cssClass: 'alert-css',
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

  // ------------------------------------

}


/*
 "data": [
        {
            "dossierId": 4,
            "etabId": 5,
            "patientId": 3,
            "doctorId": 61,
            "dThorasic": "1",
            "lastName": "Hocino",
            "firstName": "Hocine",
            "birthDay": "1980-06-01",
            "birthDayFr": "01-06-1980",
            "age": 39,
            "gender": "1",
            "qrCode": null,
            "weight": "110",
            "ecgImage": "4_1577625377.JPG",
            "startAt": "13:16",
            "statusDossier": "0",
            "page": "intervention",
            "diagnostic": "ST"
        },
        {
            "dossierId": 15,
            "etabId": 5,
            "patientId": 7,
            "doctorId": 89,
            "dThorasic": "1",
            "lastName": "bergad2",
            "firstName": "farid2",
            "birthDay": "1980-06-01",
            "birthDayFr": "01-06-1980",
            "age": 39,
            "gender": "1",
            "qrCode": null,
            "weight": "110",
            "ecgImage": "15_1577702693.png",
            "startAt": "10:44",
            "statusDossier": "0",
            "page": "last-drug",
            "diagnostic": "RAS"
        }
    ]
*/
