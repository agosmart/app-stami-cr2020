import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CudtDetailsPageRoutingModule } from './cudt-details-routing.module';

import { CudtDetailsPage } from './cudt-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CudtDetailsPageRoutingModule
  ],
  declarations: [CudtDetailsPage]
})
export class CudtDetailsPageModule {}
