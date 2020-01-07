import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController, LoadingController } from '@ionic/angular';
import { UserModel } from '../models/user.model';
import { GlobalvarsService } from '../services/globalvars.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isActive = false;
  isSos = false;
  nameEtab:string;
  fullName: string;
  dataDoctor: UserModel;
  gender;


  constructor(
    private sglob: GlobalvarsService,
    // public loading: LoadingService,
    // private srv: ServiceAppService,
    private formBuilder: FormBuilder,
    public navcrtl: NavController,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    // private alertCtrl: AlertController
  ) { }


  get activity() {
    return this.formDoctor.get('activity');
  }
  get sos() {
    return this.formDoctor.get('sos');
  }


  formDoctor = this.formBuilder.group({
    // activity: ['false', [Validators.pattern]]
    activity: ['', ''],
    sos: ['', ''],
  });

  // ----------------------------------------------

  // ionViewDidEnter() {
  //   this.isActive = this.sglob.getIsActive();
  //   this.isSos = this.sglob.getIsSos();

  //   console.log('isSos HOME===>', this.isSos);
  //   console.log('isActive HOME===>', this.isActive);
  // }

  ngOnInit() {

    this.isActive = this.sglob.getIsActive();
    this.isSos = this.sglob.getIsSos();
    this.nameEtab = this.sglob.getNameEtab();

    console.log('isSos HOME===>', this.isSos);
    console.log('isActive HOME===>', this.isActive);


    this.activatedroute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('dataDoctorObj')) {
        /* ========================================
                  Redirection to Home
       =========================================== */
        this.router.navigate(['/login']);
      } else {
        this.dataDoctor = JSON.parse(paramMap.get('dataDoctorObj'));
        console.log(' Data Doctor From Login:::', this.dataDoctor);
        this.gender = this.dataDoctor.gender;
        this.fullName = this.dataDoctor.lastName + ' ' + this.dataDoctor.firstName;

        // this.isActive = false;
        // this.isSos = true;
      }
    });

  }




  onActiveStateChange(isActive: boolean) {
    // this.formDoctor.get('activity').setValue(this.isActive);
    this.isActive = !isActive;
    console.log('value of :::: isActive :::', this.isActive);
    this.sglob.setIsActive(this.isActive);
    // TODO :: Update a value of (isActive) in databes via service

  }

  onSosStateChange(isSos: boolean) {
    this.isSos = !isSos;
    console.log('value of :::: isSos :::', this.isSos);
    // this.formDoctor.get('sos').setValue(this.isSos);
    this.sglob.setIsSos(this.isSos);
    // TODO :: Update a value of (isSos) in databes via service

  }



  submitform() {

  //  this.router.navigate(['/cudt-list']);
    this.router.navigate(['/dossiers']);

  }



}



/*

{
    "code": "200",
    "message": "Authentification réussie, bienvenus Docteur",
    "data": {
        "id": 61,
        "lastName": "Mohamed",
        "firstName": "Mouallem",
        "gender": "2",
        "birthDay": "1990-05-08",
        "birthDayFr": "08-05-1990",
        "age": 29,
        "email": "enafor99@gmail.com",
        "mobile": "0560114488",
        "uid": "115599775533225588445566",
        "apiToken": "88W7AMW58FX4S6gUY0AcdHO7QEmftTav2UuhG9mW0Qu9vvMMAiFNqexJjfTJ",
        "enFonction": null,
        "disponibleAvis": null,
        "etablissment": [
            {
                "etabId": 5,
                "longitude": "0.80000000",
                "latitude": "1.10000000"
            }
        ]
    }
}

*/
