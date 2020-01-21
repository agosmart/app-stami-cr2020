import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Platform, NavController } from "@ionic/angular";
import { GlobalvarsService } from "../services/globalvars.service";
import { Router } from "@angular/router";
import { IonSlides } from '@ionic/angular';

@Component({
  selector: "app-onboard",
  templateUrl: "./onboard.page.html",
  styleUrls: ["./onboard.page.scss"]
})
export class OnboardPage implements OnInit {



  slideOpts = {
    initialSlide: 1,
    speed: 400,

  };

  affichePub: boolean;



  constructor(
    public navcrtl: NavController,
    private nativeStorage: NativeStorage,
    private plat: Platform,
    private sglob: GlobalvarsService,
    private router: Router
  ) {
    //this.deleteStore();
    this.affichePub = false;
    this.plat.ready().then(() => {
      this.getItems();
    });
  }


  ngOnInit() {


  }



  public skiping() { }

  getItems() {
    this.nativeStorage.getItem("cardio").then(
      data => this.goToHome(data),
      error => (this.affichePub = true)
    );
  }
  goToLogin() {
    console.log(":::::::: Go Login ::::::::");
    this.router.navigate(["/login"]);
  }

  goToHome(data: any) {
    console.log(":::::::: Go Home ::::::::");
    this.sglob.updateInfoUser(data.idUser, data.token, data.idEtab, data.nameEtab);
    this.router.navigate(["/home"]);
  }

  deleteStore() {
    this.nativeStorage.remove("cardio");
  }
}
