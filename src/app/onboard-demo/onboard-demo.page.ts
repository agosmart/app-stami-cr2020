import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboard-demo',
  templateUrl: './onboard-demo.page.html',
  styleUrls: ['./onboard-demo.page.scss'],
})
export class OnboardDemoPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  goToIntro: boolean;

  constructor(
    public navcrtl: NavController,
    private router: Router
  ) {
    //this.deleteStore();

  }

  ngOnInit() { }

  public skipDemo() {
    console.log(':::::::: SKIPE ::::::::');
    this.router.navigate(['/login']);
  }

  // deleteStore() {
  //   this.nativeStorage.remove('cardio-cr');
  // }

}
