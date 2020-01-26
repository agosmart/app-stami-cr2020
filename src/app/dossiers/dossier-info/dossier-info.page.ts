import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { ImagePage } from '../../modal/image/image.page';
import { ModalController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DossierGlobaleResponseData } from 'src/app/models/dossier.globale.response';
import { GlobalvarsService } from 'src/app/services/globalvars.service';
import { ServiceAppService } from 'src/app/services/service-app.service';
import { Observable } from 'rxjs';
import { DossierGlobaleModel, InformationModel, Treatment, EcgDataModel, ResponseModel, ProtocoleModel } from 'src/app/models/dossier.globale.model';


@Component({
  selector: 'app-dossier-info',
  templateUrl: './dossier-info.page.html',
  styleUrls: ['./dossier-info.page.scss'],
})
export class DossierInfoPage implements OnInit {

  idUser: number;
  idEtab: number;
  token: string;
  nameEtab: string;
  numDossier: number;

  dataDossier: DossierGlobaleModel;
  informationsObj: any;//InformationModel;
  protocoleObj: Array<any>;
  treatmentsObj: Array<any>;
  automaticClose = true;
  urlEcg: string;
  ecgTmp: string;
  idDossier: number;

  // ------------------------
  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private srv: ServiceAppService,
    private sglob: GlobalvarsService,
    private loadingCtrl: LoadingController,
  ) {
    // ++++++++++++++++++ GET STORED DTATA ++++++++++++++++++++++++
    this.idUser = this.sglob.getIdUser();
    this.idEtab = this.sglob.getidEtab();
    this.token = this.sglob.getToken();
    this.nameEtab = this.sglob.getNameEtab();


    console.log('token => dossier ', this.token);

    // this.http.get('assets/informations.json').subscribe(
    //   res => {
    //     this.informations = res['items'];
    //     //this.informations[0].open = true;
    //   }
    //   , err => {
    //     console.log('error data', err);
    //   }
    // );



  }

  // ionViewDidEnter() {
  //   console.log('ionViewDidEnter => get idEtab :::', this.idEtab);
  //   this.initWaitingSendingDossiers(event);
  // }


  ngOnInit() {

    // http://cardio.cooffa.shop/api/dossierGlobal/18
    this.activatedroute.paramMap.subscribe(paramMap => {
      console.log('paramMap ===>', paramMap);
      if (!paramMap.has('idDossier')) {
        /* ========================================
                  Redirection to Home
       =========================================== */
        this.router.navigate(['/home']);
      } else {
        this.idDossier = +paramMap.get('idDossier');
        this.onGetDossierGlobale(this.idDossier);
      }
    });



  }


  onGetDossierGlobale(idDossier: number) {
    console.log(' :::::::::: onGetDossierGlobale :::');

    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Chargement en cours...' })
      .then(loadingEl => {
        loadingEl.present();

        // const authObs: Observable<any> = this.http.get<any>('assets/dossiers-cudt.json');
        const authObs: Observable<DossierGlobaleResponseData> = this.srv.getDossierGlobale(
          idDossier,
          this.token
        );

        authObs.subscribe(
          resData => {
            if (+resData.code === 200) {
              // ---------- Mesuring time of exection ----------
              // tslint:disable-next-line: no-console
              // console.time('execution-time');
              // ----- Hide loader ------
              loadingEl.dismiss();

              this.dataDossier = resData.data;
              console.log(' dataDossier :::', this.dataDossier);

              // this.dataDossier.informations['open'] = false;            

              this.informationsObj = this.dataDossier.informations;
              this.treatmentsObj = this.dataDossier.treatments;
              this.protocoleObj = this.dataDossier.protocole;

              // this.dataDossier.ecgData['open'] = false;


              // this.informationsObj['open'] = false;
              console.log(' dataDossier + open :::', this.dataDossier);
              console.log(this.informationsObj, 'informationsObj ::::', this.informationsObj.open);
              console.log(this.treatmentsObj, 'treatmentsObj ::::');
              console.log(this.protocoleObj, 'this.protocoleObj ::::');
              //  this.protocoleObj =[];

            } else {
              // ----- Hide loader ------
              loadingEl.dismiss();
              // --------- Show Alert --------
              this.sglob.showAlert('Erreur!', resData.message);
            }

          },
          errData => {
            console.log(errData);
            // ----- Hide loader ------
            loadingEl.dismiss();

            // --------- Show Alert --------
            if (errData.error.errors != null) {
              this.sglob.showAlert('Erreur!', errData.error.errors.email);
            } else {
              this.sglob.showAlert('Erreur!', 'Problème d\'accès au réseau, veillez vérifier votre connexion'
              );
            }
          }


        );
      }
      );
  }
  toggleSelectionItem() {

    this.informationsObj.open = !this.informationsObj.open;
    console.log('informationsObj ITEM :::', this.informationsObj.open);
    if (this.automaticClose && this.informationsObj.open) {
      this.informationsObj.open = false;
    }
  }
  /*
    toggleSelection(index) {
      this.informations[index].open = !this.informations[index].open;
      if (this.automaticClose && this.informations[index].open) {
        this.informations
          .filter((item, itemIndex) => itemIndex !== index)
          .map((item) => { item.open = false; });
      }
    }
  */
  // -----------------------------
  async openImageEcg(ecgImage) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { img: ecgImage }
    });
    return await modal.present();
  }

  // openImagePreviewEcg(image) {
  //   this.modalCtrl.create({
  //     component: ImageModalPage,
  //     componentProps: { img: image }
  //   }).then(
  //     modal => (modal.present())
  //   );
  // }


}


/*
{
        "dossierId": 1,
        "etabId": 5,
        "patientId": 1,
        "doctorId": 61,
        "dThorasic": "1",
        "lastName": "bouaziz1",
        "firstName": "dada1",
        "birthDay": "2010-06-01",
        "birthDayFr": "01-06-2010",
        "age": 9,
        "gender": "2",
        "qrCode": null,
        "ecgImage": "2_1577612698.png",
        "ecgData": [
            {
                "dossierId": 1,
                "ecgImage": "1_1577611953.png",
                "createdAt": "29-12-2019 09:32",
                "etape": "Inscription",
                "doctor": {
                    "doctorId": 61,
                    "lastName": "Mohamed",
                    "firstName": "Mouallem",
                    "gender": "2"
                }
            }
        ],
        "weight": "90",
        "startAt": "09:44",
        "statusDossier": "1",
        "page": "intervention",
        "diagnostic": {
            "doctorId": 61,
            "doctor": {
                "lastName": "Mohamed",
                "firstName": "Mouallem",
                "gender": "2"
            },
            "diagnostique": "ST"
        },
        "demandeAvisId": 1
    }
*/


