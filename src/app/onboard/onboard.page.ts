import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Platform, NavController } from "@ionic/angular";
import { GlobalvarsService } from "../services/globalvars.service";
import { Router } from "@angular/router";
import { IonSlides } from "@ionic/angular";

@Component({
  selector: "app-onboard",
  templateUrl: "./onboard.page.html",
  styleUrls: ["./onboard.page.scss"]
})
export class OnboardPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
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

  ngOnInit() {}

  public skiping() {}

  getItems() {
    this.nativeStorage.getItem("cardio-cr").then(
      data => this.goToHome(data),
      error => (this.affichePub = true)
    );
  }
  goToLogin() {
    console.log(":::::::: Go Login ::::::::");
    this.router.navigate(["/login"]);
  }

  goToHome(data: any) {
    const dataDoctorObj = data.dataDoctorObj;
    console.log(
      ":::::::: get item Go Home data etabId   ::::::::",
      dataDoctorObj.etablissment[0]["etabId"]
    );

    this.sglob.setIsActive(dataDoctorObj.enFonction);
    this.sglob.setIsSos(dataDoctorObj.disponibleAvis);
    this.sglob.updateInfoUser(
      dataDoctorObj.id,
      dataDoctorObj.apiToken,
      dataDoctorObj.etablissment[0]["etabId"],
      dataDoctorObj.etablissment[0]["name"]
    );
    this.router.navigate(["/home", JSON.stringify(data.dataDoctorObj)]);
  }

  deleteStore() {
    this.nativeStorage.remove("cardio-cr");
  }
}
