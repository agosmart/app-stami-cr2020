import { Component, OnInit } from '@angular/core';
import { ServiceAppService } from '../services/service-app.service';
import { GlobalvarsService } from '../services/globalvars.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LoadingController,
  AlertController,
  ActionSheetController,
  MenuController
} from '@ionic/angular';
import { Observable } from 'rxjs';
import {
  DossiersCudtCrResponseData,
  ResponseCudt
} from '../models/dossies.cudt.cr.response';
import { DossierModel } from '../models/dossier.model';
import { ReponseAvisResponseData } from '../models/reponseAvis.response';

@Component({
  selector: 'app-dossiers',
  templateUrl: './dossiers.page.html',
  styleUrls: ['./dossiers.page.scss']
})
export class DossiersPage implements OnInit {
  idUser: number;
  idEtab: number;
  token: string;
  nameEtab: string;
  numDossier: number;
  // cudtId: number;
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
  isRefresh = false;
  checkmarkColors = ['#f25454', '#02a1b3', '#516bf0'];


  // data: any = { myToggle: true };


  constructor(
    private srv: ServiceAppService,
    private sglob: GlobalvarsService,
    // private activatedroute: ActivatedRoute,
    public menuCtrl: MenuController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private actionSheetController: ActionSheetController
  ) {
    // ++++++++++++++++++ GET STORED DTATA ++++++++++++++++++++++++
    this.idUser = this.sglob.getIdUser();
    this.idEtab = this.sglob.getidEtab();
    this.token = this.sglob.getToken();
    this.nameEtab = this.sglob.getNameEtab();

    console.log('token => dossier ', this.token);
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter => get idEtab :::', this.idEtab);
    this.initWaitingSendingDossiers(event);
  }

  ionViewWillEnter() {
    // disable side-menu
    this.menuCtrl.enable(false);
  }
  ngOnInit() { }

  /*
    isFilttred(data) {
      this.data.myToggle = data;
    }
  */

  doRefresh(event: any) {
    console.log('Begin async operation');
    this.isRefresh = true;
    this.initWaitingSendingDossiers(event);
    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   event.target.complete();
    // }, 2000);
  }

  segmentButtonClicked(value: string) {
    // console.log('Segment button clicked', value);
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

  getDossier(idDossier: number) {
    console.log('get Dossier : dossierId ==== >', idDossier);
    this.router.navigate(['/dossier-infos', idDossier]);
  }

  getRandomNumber() {
    return (this.numDossier = Math.floor(100000 + Math.random() * 9000));
  }

  public initWaitingSendingDossiers(event: any) {
    console.log(
      'initWaitingSendingDossiers() ::::: waiting - Sending list ::::'
    );
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Chargement en cours...' })
      .then(loadingEl => {
        if (!this.isRefresh) {
          loadingEl.present();
        }
        // ----------- END PARAMS  ---------------
        // const crId = this.idEtab;

        /**********************************
         * STATIC DATA*
         * ******************************* */

        // this.token = 's2LTdKGqPxwl4atfVql2bE2O3Mde1XmwgrrcqDQzlROTHF0tINhHeSKgdo5z';
        // this.idEtab = 1;
        // this.idUser = 92;

        /*********************************** */

        // const authObs: Observable<any> = this.http.get<any>('assets/dossiers-cudt.json');
        const authObs: Observable<DossiersCudtCrResponseData> = this.srv.getDossiersCudtCr(
          this.idEtab,
          this.token
        );

        authObs.subscribe(
          resData => {
            if (+resData.code === 200) {
              // ---------- Mesuring time of exection ----------
              // tslint:disable-next-line: no-console
              console.time('execution-time');
              // --------------------------------------------

              // this.numDossier = Math.floor(100000 + Math.random() * 9000);
              this.dataDossiers = resData.data;
              this.dataDossiersSending = resData.data.sending.reverse();
              this.dataDossiersPending = resData.data.pending.reverse();

              this.totalPending = this.dataDossiers.totalPending;
              this.totalSending = this.dataDossiers.totalSending;

              console.log('dataDossiersPending::', this.dataDossiersPending);

              // =============== CREATE  A NEW DTAT OF WAITTING LIST===================================

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

                  lastDemandeId: data.demandes.map(m => m.demandeId).pop(),

                  // -------------------------------------
                  lastMotifId: data.demandes
                    .map(dem => {
                      const motifId = dem.motifId;
                      const lenResp = dem.reponses.length;
                      const find = dem.reponses.every(
                        f => f.doctorId !== this.idUser // doctorId
                      );
                      if (find || lenResp === 0) {
                        // console.log("1111 :::", motifId);
                        return motifId;
                      } else {
                        // console.log("0000 :::", motifId);
                        return 0;
                      }
                    })
                    .pop(),
                  // -------------------------------------
                  prevNotif: data.demandes.map((dem, index) => {
                    const myMotifId = dem.motifId;
                    let myReponse = null;
                    const lenResp = dem.reponses.length;
                    // ............................
                    const find = dem.reponses.find(f => {
                      myReponse = f.reponse;
                      return f.doctorId === this.idUser;
                    });
                    // ..............................
                    if (find && lenResp !== 0) {
                      return {
                        pos: myMotifId,
                        motifId: myMotifId,
                        reponse: myReponse,
                        doctorId: this.idUser
                      };
                    } else {
                      return {
                        pos: myMotifId,
                        motifId: null,
                        reponse: null,
                        doctorId: null
                      };
                    }
                  })
                  // -------------------------------------
                };
              });

              // =============== FILL and STORE => prevMotif [Array values] ===================================

              this.listOfWaittingNotif.map((item: any) => {
                const poseArr = [];
                //  const not = item.prevNotif
                item.prevNotif.map(p => {
                  const pos = p.pos;
                  poseArr.push(pos);
                  // console.log(pos, ' - ', poseArr);
                });
                // console.log(' poseArr ', poseArr);
                for (let i = 1; i <= 3; i++) {
                  console.log(poseArr.includes(i));
                  if (!poseArr.includes(i)) {
                    item.prevNotif.push({
                      pos: i,
                      motifId: null,
                      reponse: null,
                      doctorId: null
                    });
                  }
                }
              });

              this.listOfWaittingNotif.filter(item =>
                item.prevNotif.sort((a: any, b: any) => a.pos - b.pos)
              );

              // -------------------------------------------------------------------------------------------

              loadingEl.dismiss();

              // console.log('listOfResult::::', listOfResult);
              console.log('*****************************');
              console.log(
                'list Of Waitting Notifications::::',
                this.listOfWaittingNotif
              );
              // console.log(' demandeId ::::', demandeId);
              console.log('*****************************');
              // console.log('listOfDemandes :::', listOfDemandes);
              console.log('*****************************');
              // console.log('listOfResponses :::', listOfResponses);

              // console.log('this.dataDossiers : ', this.dataDossiers);
              // console.log('this.dataDossiers[encours] : ', this.dataDossiersSending);
              // console.log('this.dataDossiers[envoyee] : ', this.dataDossiersPending);

              console.log('totalPending : ', this.totalPending, '/ totalSending', this.totalPending);

              // ---------- Mesuring time of exection ----------
              // tslint:disable-next-line: no-console
              console.timeEnd('execution-time');
              // -------------------------------------
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
      })
      .then(() => {
        console.log('isRefresh::::>', this.isRefresh);
        if (this.isRefresh) {
          event.target.complete();
          this.isRefresh = !this.isRefresh;
        }
      });
  }

  async actionSheetSetDoctorReview(lastDemandeId: number, lastMotifId: number) {
    console.group(' ---- Action Sheet Set Doctor review ----');
    console.log('- lastDemandeId ::::>', lastDemandeId);
    console.log('- lastMotifId ::::> ', lastMotifId);
    console.groupEnd();

    if (lastMotifId === 1) {
      // # 1 == Demande d'avis ST (RAS/ST)
      await this.actionSheetIsSt(lastDemandeId);
    } else if (lastMotifId === 2) {
      // # 2 == Demande d'avis THROMBOLYSE (oui/non)
      await this.actionSheetIsThrombolyse(lastDemandeId);
    } else {
      // # 3 == Demande de validation d'envoie du patient au CR (oui/non)
      await this.actionSheetIsSending(lastDemandeId);
    }
  }

  /* ============= PATIENT ST-RAS ==============*/
  async actionSheetIsSt(lastDemandeId: number) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'action-sheet',
      header: 'Demande d\'avis diagnostique',
      // tslint:disable-next-line: max-line-length
      subHeader:
        'Vous avez recu une demande d\'avis concernant le patient Mouallem Mohamed, merci de partager votre constat avec vos collègues',
      buttons: [
        {
          cssClass: 'icon-heart-checked actionSheet_withIcomoon ras',
          text: 'Rien à signaler',
          // icon: 'icon-heart-checked',
          handler: () => {
            console.log('RAS clicked');
            /* ======================================*/
            this.onResponseToNotifReview(lastDemandeId, 'RAS');
            /* ======================================*/
          }
        },
        {
          text: 'Patient ST',
          cssClass: 'icon-heart-st actionSheet_withIcomoon st',
          // icon: 'share',
          handler: () => {
            console.log('ST clicked');
            /* ======================================*/
            this.onResponseToNotifReview(lastDemandeId, 'ST');
            /* ======================================*/
          }
        },
        {
          text: 'Annuler',
          cssClass: 'icon-remove-outline actionSheet_withIcomoon cancel ',
          // icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  /* ============= THRMBOLYSE ==============*/
  async actionSheetIsThrombolyse(lastDemandeId: number) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'action-sheet',
      header: 'Demande d\'avis Thrombolyse',
      // tslint:disable-next-line: max-line-length
      subHeader:
        'Vous avez recu une demande d\'avis concernant le patient Mouallem Mohamed, merci de partager votre constat avec vos collègues',
      buttons: [
        {
          cssClass: 'icon-user-delete actionSheet_withIcomoon non',
          text: 'Ne pas Appliquer',
          // role: 'destructive',
          // icon: 'icon-heart-checked',
          handler: () => {
            console.log('Thrombolyse Rejcted clicked');
            /* ======================================*/
            this.onResponseToNotifReview(lastDemandeId, 'NON');
            /* ======================================*/
          }
        },
        {
          cssClass: 'icon-int-thromb actionSheet_withIcomoon oui',
          text: 'Appliquer le thrombolyse',
          // icon: 'share',
          handler: () => {
            console.log('Thrombolyse Accepted clicked');
            /* ======================================*/
            this.onResponseToNotifReview(lastDemandeId, 'OUI');
            /* ======================================*/
          }
        },
        {
          text: 'Annuler',
          cssClass: 'icon-remove-outline actionSheet_withIcomoon cancel ',
          // icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  /* ============= SEND PATIENT ==============*/
  async actionSheetIsSending(lastDemandeId: number) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'action-sheet',
      header: 'Notification de reception',
      // tslint:disable-next-line: max-line-length
      subHeader:
        'Nous vous informons que le patient sera envoyé sera envoyé  à votre établissement avec votre accord dans les plus brefs délais',
      buttons: [
        {
          cssClass: 'icon-user-delete actionSheet_withIcomoon non',
          text: ' Je n\'accorde pas',
          // role: 'destructive',
          // icon: 'icon-heart-checked',
          handler: () => {
            console.log('Sending rejected clicked');
            /* ======================================*/
            this.onResponseToNotifReview(lastDemandeId, 'NON');
            /* ======================================*/
          }
        },
        {
          cssClass: 'icon-user-checked actionSheet_withIcomoon oui',
          text: 'J\'accord',
          // icon: 'share',
          handler: () => {
            console.log('Sending accepted clicked');
            /* ======================================*/
            this.onResponseToNotifReview(lastDemandeId, 'OUI');
            /* ======================================*/
          }
        },
        {
          text: 'Annuler',
          cssClass: 'icon-remove-outline actionSheet_withIcomoon cancel ',
          // icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  // -------------- SEND YOUR REVIEW  -----------------------------------

  private onResponseToNotifReview(
    lastDemandeId: number,
    responseReview: string
  ) {
    console.log(
      ' onResponseNotifReview ::::: demandeId Notif to set - ::::',
      lastDemandeId
    );
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Envoie en cours...' })
      .then(loadingEl => {
        loadingEl.present();
        // ----------- END PARAMS  ---------------
        const params = {
          demandeId: lastDemandeId,
          doctorId: this.idUser,
          response: responseReview
        };

        console.log('params======>', params);
        // const authObs: Observable<any> = this.http.get<any>('assets/dossiers-cudt.json');
        const authObs: Observable<ReponseAvisResponseData> = this.srv.reponseDemandeAvis(
          params,
          this.token
        );

        authObs.subscribe(
          res => {
            if (+res.code === 201) {
              loadingEl.dismiss();
              console.log('this.response : ', res.message);
              this.showAlert(res.message);
              // tslint:disable-next-line: deprecation
              this.initWaitingSendingDossiers(event);
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
                'Prblème d\'accès au réseau, veillez vérifier votre connexion'
              );
            }
          }
        );
      });
  }

  private showAlert(mesg: string) {
    this.alertCtrl
      .create({
        header: 'RÉSULTAT',
        message: mesg,
        cssClass: 'alert-css',
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

  // ------------------------------------
}
