import { DossierModel } from "./dossier.model";

// ----------- RESPONSE MODEL-------------------
export interface DossiersCudtCrResponseData {
    code: number;
    message: string;
    data: ResponseCudt;
}

export interface ResponseCudt {
    totalPending: number;
    totalSending: number;
    sending: Array<DossierModel>;
    pending: Array<DossierModel>;

    
}
