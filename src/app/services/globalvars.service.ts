import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Injectable({
  providedIn: 'root'
})
export class GlobalvarsService {
  private idUser: number;
  private token: string;
  private idEtab: number;
  private nameEtab: string;
  private isSos: boolean;
  private isActive: boolean;
  private urlEcg = 'http://cooffa.shop/';
  private initFetch = false;
  private notif: number;



  constructor(
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private webview: WebView,
    private nativeStorage: NativeStorage,
  ) { }

  public updateInfoUser(idUser, token, idEtab, nameEtab) {
    console.log(':::::::: Go Home data  service idEtab ::::::::', idEtab);
    this.idUser = idUser;
    this.token = token;
    this.idEtab = idEtab;
    this.nameEtab = nameEtab;
  }
  public setIsActive(isActive) {
    this.isActive = isActive;
  }
  public getIsActive() {
    return this.isActive;
  }
  public setIsSos(isSos) {
    this.isSos = isSos;
  }
  public getIsSos() {
    return this.isSos;
  }

  public SetStorage(dataResponseVal: any) {
    console.log('Stored item login !', dataResponseVal),

      this.nativeStorage.setItem('cardio-cr', {
        dataDoctorObj: dataResponseVal
      }).then(
        () => console.log('Stored item!', this.idUser),
        error => console.error('Error storing item', error)
      );
  }
  public deleteStorage() {
    this.nativeStorage.remove('cardio-cr');
  }

  // public updateInitFetchHome(initFetch) {
  //   this.initFetch = initFetch;
  // }
  // public getInitFetch() {
  //   return this.initFetch;
  // }

  public getIdUser() {
    return this.idUser;
  }

  public getToken() {
    return this.token;
  }

  public getidEtab() {
    return this.idEtab;
  }

  public getNameEtab() {
    return this.nameEtab;
  }
  public getUrlEcg() {
    return this.urlEcg;
  }

  public setNotif(amountNotif: number) {
    return this.notif = amountNotif
  }
  public getNotif() {
    return this.notif
  }



  async presentToast(text) {
    const toast = await this.toastController.create({
      showCloseButton: true,
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  public pathForImage(img: any) {
    console.log('img', img);
    if (img === null) {
      return '';
    } else {
      const converted = this.webview.convertFileSrc(img);
      console.log('converted', converted);
      return converted;
    }
  }




  public showAlert(headerAlert: string, messageAlert: string) {
    this.alertCtrl
      .create({
        header: headerAlert,
        message: messageAlert,
        cssClass: 'alert-css',
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }

  public createFileName() {
    const d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpg';
    return newFileName;
  }
}
