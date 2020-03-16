
export interface NotifrResponseData {
    code: number;
    message: string;
    total: number;
    data: Array<NotifModel>;
}

export interface NotifModel {
    notificationId: number;
    message: string;
    doctorId: number;
    doctorName: string;
    demandeAvisId: number;
    motifId: number;
    dossierId: number;
    cr_name: string;
    cudt_name: string;
    createdAt: string;
}


