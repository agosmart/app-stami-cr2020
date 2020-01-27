import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardDemoPageRoutingModule } from './onboard-demo-routing.module';

import { OnboardDemoPage } from './onboard-demo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardDemoPageRoutingModule
  ],
  declarations: [OnboardDemoPage]
})
export class OnboardDemoPageModule {}
