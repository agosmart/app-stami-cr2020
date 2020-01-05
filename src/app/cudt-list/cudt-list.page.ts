import { Component, OnInit } from '@angular/core';
import { EtabModel } from '../models/etab.model';
import { Router } from '@angular/router';
import { EtabResponseData } from '../models/etab.response';
import { Observable } from 'rxjs';
import { ServiceAppService } from '../services/service-app.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { GlobalvarsService } from '../services/globalvars.service';

@Component({
  selector: 'app-cudt-list',
  templateUrl: './cudt-list.page.html',
  styleUrls: ['./cudt-list.page.scss'],
})
export class CudtListPage implements OnInit {



  itemsCR: Array<EtabModel>;
  idUser: number;
  idEtab: number;
  token: string;
  lnCudtList = 0;

  constructor(
    private srv: ServiceAppService,
    private loadingCtrl: LoadingController,
    private sglob: GlobalvarsService,
    private alertCtrl: AlertController,
    private router: Router) {


    this.idUser = this.sglob.getIdUser();
    this.idEtab = this.sglob.getidEtab();
    this.token = this.sglob.getToken();
  }
  ionViewDidEnter() {
    //  this.showListCudtOfCr();
  }

  ngOnInit() {
    this.showListCudtOfCr();

    // this.itemsCR =
    //   [
    //     {
    //       etabId: 5,
    //       etabType: '1',
    //       etabName: 'CUDT HAI EL-BADRE',
    //       longitude: '1.00000000',
    //       latitude: '2.00000000'
    //     },
    //     {
    //       etabId: 1,
    //       etabType: '1',
    //       etabName: 'CUDT H.DEY',
    //       longitude: '1.20000000',
    //       latitude: '1.50000000'
    //     },
    //     {
    //       etabId: 7,
    //       etabType: '1',
    //       etabName: 'CUDT KOUBA',
    //       longitude: '1.00000000',
    //       latitude: '2.00000000'
    //     },
    //     {
    //       etabId: 8,
    //       etabType: '1',
    //       etabName: 'CUDT PARNET',
    //       longitude: '2.00000000',
    //       latitude: '3.00000000'
    //     },
    //     {
    //       etabId: 9,
    //       etabType: '1',
    //       etabName: 'CUDT CHEVALIER',
    //       longitude: '1.50000000',
    //       latitude: '1.80000000'
    //     },

    //   ];


  }


  showListCudtOfCr() {
    console.log('showListCudtOfCr() ::::: waiting - Sending list ::::');
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Chargement en cours...' })
      .then(loadingEl => {
        loadingEl.present();
        // ----------- END PARAMS  ---------------
        const crId = this.idEtab;
        // const authObs: Observable<any> = this.http.get<any>('assets/dossiers-cudt.json');
        const authObs: Observable<EtabResponseData> = this.srv.getListCudtOfCr(crId, this.token);

        authObs.subscribe(
          res => {
            if (+res.code === 200) {
              loadingEl.dismiss();
              this.itemsCR = res.data;
              console.log('this.itemsCR : ', this.itemsCR);
              this.lnCudtList = this.itemsCR.length;

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
                "Prblème d'accès au réseau, veillez vérifier votre connexion"
              );
            }

          });
      });
  }


  selectCudt(cudtId) {
    // # etabId ==== CUDT
    this.router.navigate(['cudt-details', cudtId]);

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
  // -----------------------

}

/*
 {
    id: 61
  lastName: "Mohamed"
  firstName: "Mouallem"
  gender: "2"
  birthDay: "1990-05-08"
  birthDayFr: "08-05-1990"
  age: 29
  email: "enafor99@gmail.com"
  mobile: "0560114488"
  uid: "111111111111111111111111"
  apiToken: "zcq16ZTnF3YBCyOQLwdL3t4qsN52SqFqj9MPjEomoYeQNe2aZzoHO3qtkV0u"
  enFonction: null
  disponibleAvis: null
  etablissment: Array(1)
  0:
  etabId: 5
  longitude: "0.80000000"
  latitude: "1.10000000"
}
*/