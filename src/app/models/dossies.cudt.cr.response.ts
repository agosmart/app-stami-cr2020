import { DossierModel } from "./dossier.model";

// ----------- RESPONSE MODEL-------------------
export interface DossiersCudtCrResponseData {
    code: number;
    message: string;
    data: ResponseCudt;
}

export interface ResponseCudt {

    sending: Array<DossierModel>;
    pending: Array<DossierModel>;
}
