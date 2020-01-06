import { Component, OnInit } from '@angular/core';
import { ServiceAppService } from '../services/service-app.service';
import { GlobalvarsService } from '../services/globalvars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DossiersCudtCrResponseData } from '../models/dossies.cudt.cr.response';

@Component({
  selector: 'app-dossiers',
  templateUrl: './dossiers.page.html',
  styleUrls: ['./dossiers.page.scss'],
})
export class DossiersPage implements OnInit {

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
