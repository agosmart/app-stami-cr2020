import { DossierGlobaleModel } from './dossier.globale.model';

export interface DossierGlobaleResponseData {
    code: number;
    message: string;
    data: DossierGlobaleModel;
}
