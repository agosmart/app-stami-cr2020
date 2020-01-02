import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { DossierModel } from 'src/app/models/dossier.model';

@Component({
  selector: 'app-cudt-details',
  templateUrl: './cudt-details.page.html',
  styleUrls: ['./cudt-details.page.scss'],
})
export class CudtDetailsPage implements OnInit {

  dataDossiers:any;
  dossiersEnCours = true;
  dossiersEnvoyes = false;

  constructor() { }

  ngOnInit() {

    this.dataDossiers = {
      encours: [
        {
          dossierId: 4,
          etabId: 5,
          patientId: 3,
          doctorId: 61,
          dThorasic: '1',
          lastName: 'Hocino',
          firstName: 'Hocine',
          birthDay: '1966-06-14',
          birthDayFr: '14-06-1966',
          age: 39,
          gender: '1',
          qrCode: null,
          weight: 110,
          ecgImage: '4_1577625377.JPG',
          startAt: '13:16',
          statusDossier: 0,
          page: 'intervention',
          diagnostic: 'ST',

        },
        {
          dossierId: 15,
          etabId: 5,
          patientId: 7,
          doctorId: 89,
          dThorasic: '1',
          lastName: 'bergad2',
          firstName: 'farid2',
          birthDay: '1970-05-01',
          birthDayFr: '01-05-1970',
          age: 39,
          gender: '1',
          qrCode: null,
          weight: 110,
          ecgImage: '15_1577702693.png',
          startAt: '10:44',
          statusDossier: 0,
          page: 'last-drug',
          diagnostic: 'RAS'
        }
      ],
      envoyee: [
        {
          dossierId: 8,
          etabId: 5,
          patientId: 3,
          doctorId: 61,
          dThorasic: '1',
          lastName: 'Salimo',
          firstName: 'Hocine',
          birthDay: '1980-06-01',
          birthDayFr: '01-06-1980',
          age: 39,
          gender: '1',
          qrCode: null,
          weight: 110,
          ecgImage: '4_1577625377.JPG',
          startAt: '13:16',
          statusDossier: 0,
          page: 'intervention',
          diagnostic: 'ST',

        },
        {
          dossierId: 21,
          etabId: 5,
          patientId: 7,
          doctorId: 89,
          dThorasic: '1',
          lastName: 'Mahmoudi',
          firstName: 'Fawzi',
          birthDay: '1980-06-01',
          birthDayFr: '01-06-1980',
          age: 39,
          gender: '1',
          qrCode: null,
          weight: 110,
          ecgImage: '15_1577702693.png',
          startAt: '10:44',
          statusDossier: 0,
          page: 'last-drug',
          diagnostic: 'RAS'
        },
        {
          dossierId: 4,
          etabId: 5,
          patientId: 3,
          doctorId: 61,
          dThorasic: '1',
          lastName: 'Hamid',
          firstName: 'Hocine',
          birthDay: '1950-06-14',
          birthDayFr: '14-06-1950',
          age: 39,
          gender: '1',
          qrCode: null,
          weight: 110,
          ecgImage: '4_1577625377.JPG',
          startAt: '13:16',
          statusDossier: 0,
          page: 'intervention',
          diagnostic: 'ST',

        },

      ]



    };
  }
  segmentButtonClicked(value) {
    console.log('Segment button clicked', value);
    if (value === 'dEnCours') {
      this.dossiersEnCours = true;
      this.dossiersEnvoyes = false;

      console.log("dossiersEnCours 1:::", this.dossiersEnCours)
      console.log("dossiersEnvoyes 1:::", this.dossiersEnvoyes)
    } else {
      this.dossiersEnCours = false;
      this.dossiersEnvoyes = true;

      console.log("dossiersEnCours 2 :::", this.dossiersEnCours)
      console.log("dossiersEnvoyes 2:::", this.dossiersEnvoyes)
    }

  }

  // ------------------------------------

}


/*
 "data": [
        {
            "dossierId": 4,
            "etabId": 5,
            "patientId": 3,
            "doctorId": 61,
            "dThorasic": "1",
            "lastName": "Hocino",
            "firstName": "Hocine",
            "birthDay": "1980-06-01",
            "birthDayFr": "01-06-1980",
            "age": 39,
            "gender": "1",
            "qrCode": null,
            "weight": "110",
            "ecgImage": "4_1577625377.JPG",
            "startAt": "13:16",
            "statusDossier": "0",
            "page": "intervention",
            "diagnostic": "ST"
        },
        {
            "dossierId": 15,
            "etabId": 5,
            "patientId": 7,
            "doctorId": 89,
            "dThorasic": "1",
            "lastName": "bergad2",
            "firstName": "farid2",
            "birthDay": "1980-06-01",
            "birthDayFr": "01-06-1980",
            "age": 39,
            "gender": "1",
            "qrCode": null,
            "weight": "110",
            "ecgImage": "15_1577702693.png",
            "startAt": "10:44",
            "statusDossier": "0",
            "page": "last-drug",
            "diagnostic": "RAS"
        }
    ]
*/
