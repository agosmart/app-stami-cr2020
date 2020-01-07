

//import { EcgModel } from  ./ecg.model ;

export interface DossierModel {
   dossierId: number;
   etabId: number;
   patientId: number;
   doctorId: number;
   dThorasic: string;
   lastName: string;
   firstName: string;
   birthDay: string;
   birthDayFr: string;
   age: number;
   gender: string;
   qrCode: string;
   weight: number;
   ecgImage: string;
   startAt: string;
   statusDossier: number;
   stepId: number;

   // info dossier
   page: string;
   diagnostic: string;
   diabetes?: number;
   hta?: number;
   tobacco?: number;
   dyslip?: string;
   insCardiaque?: number;
   cardIscStable?: number;
   sca?: string;
   daignoDate?: string;
   angioCoran?: string;
   atlDate?: string;

   LastDemandeAvisId?: number;
   lastMotifId?: number;
   resultId?: number;
   resultName?: string;
   demandeAvisId?: number;
   demandes: Array<DemandeAvisModel>;




}

export interface DemandeAvisModel {
   demandeId: number;
   motifId: number;
   motifName: string;
   reponses: Array<ResponseAvisModel>;
}

export interface ResponseAvisModel {
   reponseId: number;
   demandeId: number;
   doctorId: number;
   reponse: string;
   doctor: string;
}

