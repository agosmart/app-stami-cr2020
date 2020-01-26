
export interface DossierGlobaleModel {

    'dossierId': number;
    'dThorasic': string;
    'weight': string;
    'resultCudt': string;
    'createdAt': string;
    'startAt': string;
    'cudtName': string;
    'doctor': object;
    'patient': object;
    'ecgData': Array<EcgDataModel>;
    'informations': InformationModel;
    'treatments': Array<Treatment>;
    'reponses': Array<ResponseModel>;
    'CDA': Array<any>;
    'CDR': Array<any>;
    'protocole': Array<ProtocoleModel>;
}

export interface Treatment {
    'title': string;
    'name': string;
    'dose': string;
}

export interface InformationModel {
    'diabetes': string;
    'hta': string;
    'tobacco': string;
    'dyslip': string;
    'insCardiaque': string;
    'cardIscStable': string;
    'sca': string;
    'daignoDate': string;
    'angioCoran': string;
    'atlDate': string;
    'stapeId': string;
    'createdAt': string;
}

export interface EcgDataModel {
    'dossierId': number;
    'ecgImage': string;
    'etape': string;
    'createdAt': string;
}
export interface ResponseModel {
    'reponse': string;
    'doctor': string;
}
export interface ProtocoleModel {
    'alteplase': string;
    'tenecteplase': string;
    'document_signe': string;
}
