import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-dossier-info',
  templateUrl: './dossier-info.page.html',
  styleUrls: ['./dossier-info.page.scss'],
})
export class DossierInfoPage implements OnInit {
  dataDossier: object;
  informations: any[];
  automaticClose = true;

  // ------------------------
  constructor(private http: HttpClient) {

    this.http.get('assets/informations.json').subscribe(
      res => {
        this.informations = res['items'];
        //this.informations[0].open = true;
      }
      , err => {
        console.log('error data', err);
      }
    )


  }

  ngOnInit() {

    this.dataDossier = {
      dossierId: 1,
      etabId: 5,
      patientId: 1,
      doctorId: 61,
      dThorasic: '1',
      lastName: 'bouaziz1',
      firstName: 'dada1',
      birthDay: '2010-06-01',
      birthDayFr: '01-06-2010',
      age: 9,
      gender: '2',
      qrCode: null,
      ecgImage: '2_1577612698.png',
      ecgData: [
        {
          dossierId: 1,
          ecgImage: '1_1577611953.png',
          createdAt: '29-12-2019 09:32',
          etape: 'Inscription',
          doctor: {
            doctorId: 61,
            lastName: 'Mohamed',
            firstName: 'Mouallem',
            gender: '2'
          }
        }
      ],
      weight: '90',
      startAt: '09:44',
      statusDossier: '1',
      page: 'intervention',
      diagnostic: {
        doctorId: 61,
        doctor: {
          lastName: 'Mohamed',
          firstName: 'Mouallem',
          gender: '2'
        },
        diagnostique: 'ST'
      },
      demandeAvisId: 1
    };


  }

  toogleSelection(index) {
    this.informations[index].open = !this.informations[index].open;
    if (this.automaticClose && this.informations[index].open) {
      this.informations
        .filter((item, itemIndex) => itemIndex !== index)
        .map((item) => { item.open = false; });
    }
  }

  // -----------------------------

}


/*
{
        "dossierId": 1,
        "etabId": 5,
        "patientId": 1,
        "doctorId": 61,
        "dThorasic": "1",
        "lastName": "bouaziz1",
        "firstName": "dada1",
        "birthDay": "2010-06-01",
        "birthDayFr": "01-06-2010",
        "age": 9,
        "gender": "2",
        "qrCode": null,
        "ecgImage": "2_1577612698.png",
        "ecgData": [
            {
                "dossierId": 1,
                "ecgImage": "1_1577611953.png",
                "createdAt": "29-12-2019 09:32",
                "etape": "Inscription",
                "doctor": {
                    "doctorId": 61,
                    "lastName": "Mohamed",
                    "firstName": "Mouallem",
                    "gender": "2"
                }
            }
        ],
        "weight": "90",
        "startAt": "09:44",
        "statusDossier": "1",
        "page": "intervention",
        "diagnostic": {
            "doctorId": 61,
            "doctor": {
                "lastName": "Mohamed",
                "firstName": "Mouallem",
                "gender": "2"
            },
            "diagnostique": "ST"
        },
        "demandeAvisId": 1
    }
*/