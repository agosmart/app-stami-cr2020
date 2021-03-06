import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { PatientResponseData } from "../models/patient.response";
//import { Md5 } from "ts-md5/dist/md5";
//import { Observable } from'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthResponseData } from "../models/auth.response";
import { DataListeEtab } from "../models/data_liste_etab";
import { DossierResponseData } from "../models/dossier.response";
import { DossierModel } from "../models/dossier.model";
import { ClotureResponseData } from "../models/cloture.response";
import { DiagResponseData } from "../models/diag.response";
import { ListeMedByCRResponseData } from "../models/listeMedByCr.response";
import { DemandeAvisResponseData } from "../models/demandeAvis.response";
import { ReponseAvisResponseData } from "../models/reponseAvis.response";
import { PretreatmentResponseData } from '../models/pretreatment.response';

interface ResponseEtab {
  code: number;
  data: DataListeEtab;
  message: string;
}

@Injectable({
  providedIn: "root"
})
export class ServiceAppService {
  //baseUrl ='http://41.110.24.164/cooffa/sante/';
  baseUrl = "http://cardio.cooffa.shop/api";

  private apiKey =
    "b5e584c61-**--d@060357f33036@6412d16b30d1?cf47828f7f07fd6015a60d7";

  extras: any;
  public setExtras(data) {
    this.extras = data;
  }

  public getExtras() {
    return this.extras;
  }

  //********************************** */

  constructor(public http: HttpClient) {}

  loginDoctor(params: object) {
    const apiUrl = this.baseUrl + "/login";
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json"
    });
    const myBody: any = params; // username / password
    return this.http.post<AuthResponseData>(apiUrl, myBody, {
      headers: myHeaders
    });
  }

  registerDoctor(params: object) {
    const apiUrl = this.baseUrl + "/register";
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json"
    });

    const myBody: object = params;
    console.log("PARAMS :::", myBody);
    return this.http.post<AuthResponseData>(apiUrl, myBody, {
      headers: myHeaders
    });
  }

  public getPatient(params: object, token: string): any {
    console.log("token service ===>", token);
    const apiUrl = this.baseUrl + "/search";
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    console.log("myHeaders service ===>", myHeaders);
    const myBody: any = params; // nom / genre datenaissance
    return this.http.post<PatientResponseData>(apiUrl, myBody, {
      headers: myHeaders
    });
  }

  public listingDossier(params: number, token: string, idEtab: number): any {
    // console.log("token service ===>", token);
    const apiUrl = this.baseUrl + "/dossiers/" + idEtab + "/" + params;
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    //console.log("myHeaders service ===>", myHeaders);
    const myBody: any = params; // nom / genre datenaissance
    // return this.http.get<DossierResponseData>(apiUrl, myBody, {
    //   headers: myHeaders
    // });
    return this.http.get<DossierResponseData>(apiUrl, {
      headers: myHeaders
    });
  }

  diagDossier(params: object, token: string) {
     
    const apiUrl = this.baseUrl + "/diagnostic";
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });

    const myBody: object = params;
    console.log("TOKEN", token, " - PARAMS :::", myBody);
    return this.http.post<DiagResponseData>(apiUrl, myBody, {
      headers: myHeaders
    });
  }

  demandeAvis(params: object, token: string) {
    const apiUrl = this.baseUrl + "/demande";
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });

    const myBody: object = params;
    console.log("PARAMS :::", myBody);
    return this.http.post<DemandeAvisResponseData>(apiUrl, myBody, {
      headers: myHeaders
    });
  }

  reponseDemandeAvis(idAvis: number, token: string) {
    const apiUrl = this.baseUrl + "/demande/" + idAvis + "/reponse";
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    return this.http.get<ReponseAvisResponseData>(apiUrl, {
      headers: myHeaders
    });
  }

  listeMedByCr(idCr: number, token: string) {
    const apiUrl = this.baseUrl + "/etablissements/" + idCr + "/medecins";
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    return this.http.get<ResponseEtab>(apiUrl, {
      headers: myHeaders
    });
  }

  addInfoDossier(params: object, token: string) {
    const apiUrl = this.baseUrl + "/dossiers_infos";
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });

    const myBody: object = params;
    console.log("PARAMS :::", myBody);
    return this.http.post<DossierResponseData>(apiUrl, myBody, {
      headers: myHeaders
    });
  }

  clotureDossier(params: object, token: string) {
    const apiUrl = this.baseUrl + "/cloture";
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });

    const myBody: object = params;
    console.log("PARAMS :::", myBody);
    return this.http.post<ClotureResponseData>(apiUrl, myBody, {
      headers: myHeaders
    });
  }

  addPretreatment( params: object , token: string){
    const apiUrl = this.baseUrl + "/pretraitement";
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    const myBody: object = params;
    console.log("PARAMS addPretreatment :::", myBody, " / URL ::::", apiUrl);
    return this.http.post<PretreatmentResponseData>(apiUrl, myBody, {
      headers: myHeaders
    });
  }

  public getPretreatment(params: object, token: string): any {
   // console.log("token service ===>", token);
    const apiUrl = this.baseUrl + "/search";
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
   // console.log("myHeaders service ===>", myHeaders);
    const myBody: any = params; // nom / genre datenaissance
    return this.http.post<PretreatmentResponseData>(apiUrl, myBody, {
      headers: myHeaders
    });
  }



  addContreIndiAbs( params: object , token: string){
    const apiUrl = this.baseUrl + "/contre_indication";
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    const myBody: object = params;
    console.log("PARAMS addContreIndiAbs :::", myBody, " / URL ::::", apiUrl);
    return this.http.post<PretreatmentResponseData>(apiUrl, myBody, {
      headers: myHeaders
    });
  }

  /*************************************** */
  // public login(form): any {
  //   const md5 = new Md5();
  //   const md5Password = md5.appendStr(form.password).end();
  //   const url = `${this.BaseUrl}login.php?password=${md5Password}&username=${form.username}&apiKey=${this.apiKey}`;

  //   return this.http
  //     .get(url)
  //     .toPromise()
  //     .then(re
  // sponse => response.json() as StandarReturnModel)
  //     .catch(error => console.log('Une erreur est survenue' + error));
  // }

  // public Inscription(registrationForm): any {
  //   const md5 = new Md5();
  //   const md5Password = md5.appendStr(registrationForm.password).end();
  //   const url = `${this.BaseUrl}inscription.php?nom=${registrationForm.nom}&prenom=${registrationForm.prenom}&mobile=${registrationForm.mobile}&password=${md5Password}&username=${registrationForm.username}&cr=${registrationForm.cr}&cudt=${registrationForm.cudt}&gender=${registrationForm.civilite}&apiKey=${this.apiKey}`;

  //   return this.http
  //     .get(url)
  //     .toPromise()
  //     .then(response => response.json() as StandarReturnModel)
  //     .catch(error => console.log("Une erreur est survenue" + error));
  // }

  // public addToken(uid, idUser, mobile): any {
  //   const url = `${this.baseUrl}token.php?idUser=${idUser}&uid=${uid}`;

  //   return this.http
  //     .get(url)
  //     .toPromise()
  //     .then(response => response.json() as StandarReturnModel)
  //     .catch(error => console.log("Une erreur est survenue" + error));
  // }

  addToken(token, idUser, mobile) {}

  getListeCR(params: number) {
    const apiUrl = this.baseUrl + "/etablissements/" + params;
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json"
    });
    const myBody: any = params; // username / password
    return this.http.get<ResponseEtab>(apiUrl, {
      headers: myHeaders
    });
  }

  // onchange
  getListeCudtByCR(params: number) {
    const apiUrl = this.baseUrl + "/cudt/" + params;
    const myHeaders: HttpHeaders = new HttpHeaders({
      Accept: "application/json"
    });
    const myBody: any = params; // username / password
    return this.http.get<ResponseEtab>(apiUrl, {
      headers: myHeaders
    });
  }
  public getListeCudtByCR1(idCr): any {
    /*    const url = `${this.baseUrl}liste_cudt.php?idCr=${idCr}&apiKey=${this.apiKey}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as StandarReturnModel)
      .catch(error => console.log("Une erreur est survenue" + error));
      */
  }
}
