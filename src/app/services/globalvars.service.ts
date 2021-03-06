import { Injectable } from "@angular/core";
import { ToastController, AlertController } from "@ionic/angular";
import { WebView } from "@ionic-native/ionic-webview/ngx";
@Injectable({
  providedIn: "root"
})
export class GlobalvarsService {
  private idUser;
  private token;
  private idEtab;
  private isSos: boolean;
  private isActive: boolean;
  private urlEcg = "http://cooffa.shop/";
  private initFetch = false;
  constructor(
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private webview: WebView
  ) { }

  public updateInfoUser(idUser, token, idEtab, ) {
    this.idUser = idUser;
    this.token = token;
    this.idEtab = idEtab;
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

  public getUrlEcg() {
    return this.urlEcg;
  }







  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000
    });
    toast.present();
  }

  pathForImage(img: any) {
    console.log("img", img);
    if (img === null) {
      return "";
    } else {
      const converted = this.webview.convertFileSrc(img);
      console.log("converted", converted);
      return converted;
    }
  }

  public showAlert(headerAlert: string, messageAlert: string) {
    this.alertCtrl
      .create({
        header: headerAlert,
        message: messageAlert,
        cssClass: "alert-css",
        buttons: ["Ok"]
      })
      .then(alertEl => alertEl.present());
  }

  createFileName() {
    const d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }
}
