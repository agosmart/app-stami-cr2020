import { DataListeEtab } from './data_liste_etab';

export interface UserModel {
  id: number;
  lastName: string;
  firstName: string;
  gender: number;
  birthDay: string;
  birthDayFr: string;
  age: number;
  email: string;
  mobile: string;
  uid: string;
  apiToken: string;
  enFonction: string;
  disponibleAvis: string;
  etablissment: Array<DataListeEtab>;
}
