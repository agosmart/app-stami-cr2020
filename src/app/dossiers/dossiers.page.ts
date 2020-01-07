import { Component, OnInit } from '@angular/core';
import { ServiceAppService } from '../services/service-app.service';
import { GlobalvarsService } from '../services/globalvars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DossiersCudtCrResponseData, ResponseCudt } from '../models/dossies.cudt.cr.response';
import { DossierModel } from '../models/dossier.model';

@Component({
  selector: 'app-dossiers',
  templateUrl: './dossiers.page.html',
  styleUrls: ['./dossiers.page.scss'],
})
export class DossiersPage implements OnInit {

  idUser: number;
  idEtab: number;
  token: string;
  numDossier: number;
  //cudtId: number; 
  dossiersEnCours = false;
  dossiersEnvoyes = true;

  dataDossiers: ResponseCudt;
  dataDossiersSending: Array<DossierModel>;
  dataDossiersPending: Array<DossierModel>;
  totalPending = 0;
  totalSending = 0;

  constructor(

    private srv: ServiceAppService,
    private sglob: GlobalvarsService,
    //private activatedroute: ActivatedRoute,
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
    //console.log('Segment button clicked', value);
    if (value === 'dEnCours') {
      this.dossiersEnCours = true;
      this.dossiersEnvoyes = false;

      // console.log('dossiersEnCours 1:::', this.dossiersEnCours);
      // console.log('dossiersEnvoyes 1:::', this.dossiersEnvoyes);
    } else {
      this.dossiersEnCours = false;
      this.dossiersEnvoyes = true;

      // console.log('dossiersEnCours 2 :::', this.dossiersEnCours);
      // console.log('dossiersEnvoyes 2:::', this.dossiersEnvoyes);
    }

  }

  getRandomNumber() {
    return this.numDossier = Math.floor(100000 + Math.random() * 9000);

  }
  data: any;

  initWaitingSendingDossiers() {
    console.log('initWaitingSendingDossiers() ::::: waiting - Sending list ::::');
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Chargement en cours...' })
      .then(loadingEl => {
        loadingEl.present();
        // ----------- END PARAMS  ---------------
        // const crId = this.idEtab;
        this.token = 's2LTdKGqPxwl4atfVql2bE2O3Mde1XmwgrrcqDQzlROTHF0tINhHeSKgdo5z';
        this.idEtab = 1;

        // const authObs: Observable<any> = this.http.get<any>('assets/dossiers-cudt.json');
        const authObs: Observable<DossiersCudtCrResponseData> = this.srv.getDossiersCudtCr(this.idEtab, this.token);

        authObs.subscribe(
          res => {
            if (+res.code === 200) {

              // this.numDossier = Math.floor(100000 + Math.random() * 9000);
              this.dataDossiers = res.data;
              this.dataDossiersSending = res.data.sending;
              this.dataDossiersPending = res.data.pending;

              this.totalPending = this.dataDossiers.totalPending;
              this.totalSending = this.dataDossiers.totalSending;


              // var doctor = persons.filter(personObj => personObj.tags.indexOf("javascript") > -1);

              // const doctor = this.dataDossiersPending.forEach(
              //   item => item.demandes.filter(obj => obj.reponses.find( el => el.doctorId === 92)));
              // console.log('::::Sending list ::::');
              //   this.data = this.dataDossiersPending.forEach(
              //     item => item  );

              //     console.log(this.data);

              // console.log('::::END /Sending list ::::');
              //  console.log("PENDING :", this.dataDossiersPending);



              // let demandes = [
              //   {
              //     demandeId: 2,
              //     motifId: 1,
              //     motifName: 'SOS',
              //     reponses: [
              //       {
              //         reponseId: 1,
              //         demandeId: 2,
              //         doctorId: 33,
              //         reponse: 'ST',
              //         doctor: 'Bago, Toto'
              //       },
              //       {
              //         reponseId: 2,
              //         demandeId: 2,
              //         doctorId: 92,
              //         reponse: 'RAS',
              //         doctor: 'Merrakchi, Elaamri'
              //       }
              //     ]
              //   }
              // ];

              //console.log(this.dataDossiersPending);

              const resultDemandes = this.dataDossiersPending.map( data => data.demandes);
              const resultResponses = resultDemandes.map( (el => el.map( e => e.reponses. find(x => x.doctorId === 92))));


              //const data = resultDemandes.map(obj => obj.reponses.find(el => el.reponseId === 2 ));

              console.log('resultDemandes :::', resultDemandes);
              console.log('resultResponses::::', resultResponses);


              // console.log('this.dataDossiers : ', this.dataDossiers);
              // console.log('this.dataDossiers[encours] : ', this.dataDossiersSending);
              // console.log('this.dataDossiers[envoyee] : ', this.dataDossiersPending);

              console.log('totalPending : ', this.totalPending, '/ totalSending', this.totalPending);

              loadingEl.dismiss();


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
                'Problème d\'accès au réseau, veillez vérifier votre connexion'
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
        header: 'RÉSULTAT',
        message: message,
        cssClass: 'alert-css',
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

  // ------------------------------------

}
