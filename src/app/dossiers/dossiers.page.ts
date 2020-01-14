import { Component, OnInit } from '@angular/core';
import { ServiceAppService } from '../services/service-app.service';
import { GlobalvarsService } from '../services/globalvars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DossiersCudtCrResponseData, ResponseCudt } from '../models/dossies.cudt.cr.response';
import { DossierModel } from '../models/dossier.model';
import { ReponseAvisResponseData } from '../models/reponseAvis.response';

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

  responseAvis: ReponseAvisResponseData;

  listOfWaittingNotif: any;
  listOfWaittingNotifFinal: any;

  totalPending = 0;
  totalSending = 0;

  //motifIdArray=[];

  constructor(

    private srv: ServiceAppService,
    private sglob: GlobalvarsService,
    //private activatedroute: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private actionSheetController: ActionSheetController
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

        /**********************************
         * STATIC DATA*
         * ******************************* */

        this.token = 's2LTdKGqPxwl4atfVql2bE2O3Mde1XmwgrrcqDQzlROTHF0tINhHeSKgdo5z';
        this.idEtab = 1;
        this.idUser = 92;

        /*********************************** */

        // const authObs: Observable<any> = this.http.get<any>('assets/dossiers-cudt.json');
        const authObs: Observable<DossiersCudtCrResponseData> = this.srv.getDossiersCudtCr(this.idEtab, this.token);

        authObs.subscribe(
          res => {
            if (+res.code === 200) {

              // ---------- Mesuring time of exection ----------
              console.time('execution-time');
              // --------------------------------------------

              // this.numDossier = Math.floor(100000 + Math.random() * 9000);
              this.dataDossiers = res.data;
              this.dataDossiersSending = res.data.sending;
              this.dataDossiersPending = res.data.pending;

              this.totalPending = this.dataDossiers.totalPending;
              this.totalSending = this.dataDossiers.totalSending;

              console.log('dataDossiersPending::', this.dataDossiersPending);


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



              // const resultDemandes = [];


              // const obj = { dossierId: 0, demandes: [] };
              //const resultDemandes = [];
              /* const resultDemandes = this.dataDossiersPending.map(
                 (data, index) => {
                   console.log(data.dossierId)
                   resp.dossierId = data.dossierId;
                   // responseArr[index].rsp = data.demandes;
                   return responseArr.push(resp);
                 }
               );*/



              // const listOfDemandes = [...new Set(this.dataDossiersPending.map(it => {
              //   return { id: it.dossierId, demandes: it.demandes };
              // } ))];


              /* const listOfResult = this.dataDossiersPending.map(data => {
                 return {
                   id: data.dossierId,
                   demandes: data.demandes
                     .map((dem) => {
                       // -------------------------
                       const notif = dem.motifId;
                       const motifName = dem.motifName
                       // -------------------------
                       return dem.reponses.find((resp) => {
                         if (resp.doctorId === 92) {
                           resp["notifId"] = notif;
                           resp["motifName"] = motifName
                           return resp;
                         }
                       })
                     })
                     .filter((fResp) => {
                       if (fResp !== undefined) {
                         return fResp;
                       }
                     })
                 };
               })*/



              this.listOfWaittingNotif = this.dataDossiersPending.map(data => {
                return {
                  dossierId: data.dossierId,
                  lastName: data.lastName,
                  firstName: data.firstName,
                  age: data.age,
                  diagnostic: data.diagnostic,
                  gender: data.gender,
                  etabName: data.etabName,
                  // ----------NEW DATA-----------------

                  /*
                  // ---- Get a sending array of demande ----
                   demandeIdArray: data.demandes.map(m => m.demandeId),

                   // ---- Get a sending array of notif ID ----
                   motifIdArray: data.demandes.map((dem) => {
                     const motifId = dem.motifId;
                     const lenResp = dem.reponses.length;
                     const find = dem.reponses.every(
                       f => f.doctorId !== this.idUser // doctorId
                     )
                     if (find || lenResp === 0) {
                       return motifId;
                     } else {
                       return 0;
                     }
                   }).filter((fl) => {
                       if (fl !== undefined) {
                         return fl;
                       }
                   }),
                  */
                  lastDemandeId: data.demandes.map(m => m.demandeId).pop(),

                  lastMotifId: data.demandes.map((dem) => {
                    const motifId = dem.motifId;
                    const lenResp = dem.reponses.length;
                    const find = dem.reponses.every(
                      f => f.doctorId !== this.idUser // doctorId
                    )
                    if (find || lenResp === 0) {
                      return motifId;
                    } else {
                      return 0;
                    }
                  })
                    .filter((fl) => {
                      if (fl !== undefined) {
                        return fl;
                      }
                    }).pop(),

                  ///-------------------------------------- 
                  prevNotif: data.demandes.map((dem) => {

                    const motifId = dem.motifId;

                    let reponse = null;
                    const lenResp = dem.reponses.length;
                    // -----------------------------------
                    const find = dem.reponses.map(m => m)
                      .find(
                        (f) => {
                          reponse = f.reponse;
                          return f.doctorId === this.idUser;
                        }
                      )
                    if (find && lenResp !== 0) {
                      return { motifId: motifId, reponse: reponse, doctorId: this.idUser }
                    } else {
                      return { motifId: null, reponse: null, doctorId: this.idUser }
                    }
                  })
                };
              })




              //console.log('listOfResult::::', listOfResult);
              console.log('*****************************');
              console.log('list Of Waitting Notifications::::', this.listOfWaittingNotif);
              // console.log(' demandeId ::::', demandeId);
              console.log('*****************************');
              // console.log('listOfDemandes :::', listOfDemandes);
              console.log('*****************************');
              //console.log('listOfResponses :::', listOfResponses);

              // console.log('this.dataDossiers : ', this.dataDossiers);
              // console.log('this.dataDossiers[encours] : ', this.dataDossiersSending);
              // console.log('this.dataDossiers[envoyee] : ', this.dataDossiersPending);

              console.log('totalPending : ', this.totalPending, '/ totalSending', this.totalPending);
              loadingEl.dismiss();
              // ---------- Mesuring time of exection ----------
              console.timeEnd('execution-time');
              // -------------------------------------
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
    this.router.navigate(['dossier-infos', dossierId]);

  }



  async actionSheetSetDoctorReview(lastDemandeId: number, lastMotifId: number) {

    console.group(' ---- Action Sheet Set Doctor review ----')
    console.log('- lastDemandeId ::::>', lastDemandeId);
    console.log('- lastMotifId ::::> ', lastMotifId);
    console.groupEnd();

    if (lastMotifId === 1) {
      //# 1 == Demande d'avis ST (RAS/ST)
      await this.actionSheetIsSt(lastDemandeId);

    } else if (lastMotifId === 2) {
      //# 2 == Demande d'avis THROMBOLYSE (oui/non)
      await this.actionSheetIsThrombolyse(lastDemandeId);

    } else {
      //# 3 == Demande de validation d'envoie du patient au CR (oui/non)
      await this.actionSheetIsSending(lastDemandeId);
    }



  }

  /* ============= PATIENT ST-RAS ==============*/
  async actionSheetIsSt(lastDemandeId: number) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'action-sheet',
      header: 'Demande d\'avis diagnostique',
      subHeader: 'Vous avez recu une demande d\'avis concernant le patient Mouallem Mohamed, merci de partager votre constat avec vos collègues',
      buttons: [{
        cssClass: "icon-heart-checked actionSheet_withIcomoon ras",
        text: 'Rien à signaler',
        //icon: 'icon-heart-checked',
        handler: () => {
          console.log('RAS clicked');
          /* ======================================*/
          this.onResponseToNotifReview(lastDemandeId, 'RAS')
          /* ======================================*/

        }
      }, {
        text: 'Patient ST',
        cssClass: "icon-heart-st actionSheet_withIcomoon st",
        //icon: 'share',
        handler: () => {
          console.log('ST clicked');
          /* ======================================*/
          this.onResponseToNotifReview(lastDemandeId, 'ST')
          /* ======================================*/
        }
      },
      {
        text: 'Annuler',
        cssClass: "icon-remove-outline actionSheet_withIcomoon cancel ",
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

  /* ============= THRMBOLYSE ==============*/
  async actionSheetIsThrombolyse(lastDemandeId: number) {

    const actionSheet = await this.actionSheetController.create({
      cssClass: 'action-sheet',
      header: 'Demande d\'avis Thrombolyse',
      subHeader: 'Vous avez recu une demande d\'avis concernant le patient Mouallem Mohamed, merci de partager votre constat avec vos collègues',
      buttons: [{
        cssClass: "icon-user-delete actionSheet_withIcomoon non",
        text: 'Ne pas Appliquer',
        // role: 'destructive',
        //icon: 'icon-heart-checked',
        handler: () => {
          console.log('Thrombolyse Rejcted clicked');
          /* ======================================*/
          this.onResponseToNotifReview(lastDemandeId, 'NON')
          /* ======================================*/

        }
      }, {

        cssClass: "icon-int-thromb actionSheet_withIcomoon oui",
        text: 'Appliquer le thrombolyse',
        //icon: 'share',
        handler: () => {
          console.log('Thrombolyse Accepted clicked');
          /* ======================================*/
          this.onResponseToNotifReview(lastDemandeId, 'OUI')
          /* ======================================*/
        }
      },
      {
        text: 'Annuler',
        cssClass: "icon-remove-outline actionSheet_withIcomoon cancel ",
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }
  /* ============= SEND PATIENT ==============*/
  async actionSheetIsSending(lastDemandeId: number) {

    const actionSheet = await this.actionSheetController.create({
      cssClass: 'action-sheet',
      header: 'Notification de reception',
      subHeader: 'Nous vous informons que le patient sera envoyé sera envoyé  à votre établissement avec votre accord dans les plus brefs délais',
      buttons: [{
        cssClass: "icon-user-delete actionSheet_withIcomoon non",
        text: ' Je n\'accorde pas',
        // role: 'destructive',
        //icon: 'icon-heart-checked',
        handler: () => {
          console.log('Sending rejected clicked');
          /* ======================================*/
          this.onResponseToNotifReview(lastDemandeId, 'NON')
          /* ======================================*/
        }
      }, {

        cssClass: "icon-user-checked actionSheet_withIcomoon oui",
        text: 'J\'accord',
        //icon: 'share',
        handler: () => {
          console.log('Sending accepted clicked');
          /* ======================================*/
          this.onResponseToNotifReview(lastDemandeId, 'OUI')
          /* ======================================*/
        }
      },
      {
        text: 'Annuler',
        cssClass: "icon-remove-outline actionSheet_withIcomoon cancel ",
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

  // -------------- SEND YOUR REVIEW  -----------------------------------

  private onResponseToNotifReview(lastDemandeId: number, responseReview: string) {
    console.log(' onResponseNotifReview ::::: demandeId Notif to set - ::::', lastDemandeId);
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Envoie en cours...' })
      .then(loadingEl => {
        loadingEl.present();
        // ----------- END PARAMS  --------------- 
        const params = {
          demandeId: lastDemandeId,
          doctorId: this.idUser,
          response: responseReview,
        };

        console.log('params======>', params);
        // const authObs: Observable<any> = this.http.get<any>('assets/dossiers-cudt.json');
        const authObs: Observable<ReponseAvisResponseData> = this.srv.reponseDemandeAvis(params, this.token);


        authObs.subscribe(
          res => {
            if (+res.code === 201) {
              loadingEl.dismiss();
              console.log('this.response : ', res.message);
              this.showAlert(res.message);

            } else {
              console.log('Erreur interne !');
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
