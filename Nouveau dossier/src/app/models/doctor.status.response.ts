export interface DoctorStatusResponse {
    code: string;
    message: string;
    data: DoctorStatusModel;
}
export interface DoctorStatusModel {
    lastName: string;
    firstName: string;
    gender?: number;
    birthDay?: string;
    birthDayFr?: string;
    age?: number;
    email?: string;
    enFonction: string;
    disponibleAvis: string;
}

