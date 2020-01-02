import { Component, OnInit } from '@angular/core';
import { EtabModel } from '../models/etab.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cudt-list',
  templateUrl: './cudt-list.page.html',
  styleUrls: ['./cudt-list.page.scss'],
})
export class CudtListPage implements OnInit {



  itemsCR: Array<EtabModel>;

  constructor(

    private router: Router
  ) { }

  ngOnInit() {

    this.itemsCR =
      [
        {
          etabId: 1,
          etabType: '1',
          etabName: 'CUDT HAI EL BADRE',
          longitude: '1.00000000',
          latitude: '2.00000000'
        },
        {
          etabId: 2,
          etabType: '1',
          etabName: 'CUDT H.DEY',
          longitude: '1.20000000',
          latitude: '1.50000000'
        },
        {
          etabId: 7,
          etabType: '1',
          etabName: 'CUDT KOUBA',
          longitude: '1.00000000',
          latitude: '2.00000000'
        },
        {
          etabId: 8,
          etabType: '1',
          etabName: 'CUDT PARNET',
          longitude: '2.00000000',
          latitude: '3.00000000'
        },
        {
          etabId: 9,
          etabType: '1',
          etabName: 'CUDT CHEVALIER',
          longitude: '1.50000000',
          latitude: '1.80000000'
        },

      ];


  }

  selectCudt(etabId) {

    this.router.navigate(['cudt-details', etabId]);

  }


  // -----------------------

}

/*
 {
    id: 61
  lastName: "Mohamed"
  firstName: "Mouallem"
  gender: "2"
  birthDay: "1990-05-08"
  birthDayFr: "08-05-1990"
  age: 29
  email: "enafor99@gmail.com"
  mobile: "0560114488"
  uid: "111111111111111111111111"
  apiToken: "zcq16ZTnF3YBCyOQLwdL3t4qsN52SqFqj9MPjEomoYeQNe2aZzoHO3qtkV0u"
  enFonction: null
  disponibleAvis: null
  etablissment: Array(1)
  0:
  etabId: 5
  longitude: "0.80000000"
  latitude: "1.10000000"
}
*/