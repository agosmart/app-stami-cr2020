import { DiagModel } from "./diag.model";

//import { EcgModel } from "./ecg.model";

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
   stapeId?: number;
   demandeAvisId?: number;
 /*
dossierId: number;
   etabId: number;
   patientId: number;
   doctorId: number;
   dThorasic: string;
   weight: number;
   ecgImage: string;
   ecgAfficher: string;
   startAt: string;
   // info dossier
   diabetes: number;
   hta: number;
   tobacco: number;
   dyslip: string;
   insCardiaque: number;
   cardIscStable: number;
   sca: string;
   daignoDate: string;
   angioCoran: string;
   atlDate: string;
   stapeId: number;
   page: string;
   demandeAvisId: number;
   diagnostic: DiagModel;
   */
   

}
