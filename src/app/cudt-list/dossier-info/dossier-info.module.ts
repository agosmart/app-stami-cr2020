import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DossierInfoPageRoutingModule } from './dossier-info-routing.module';

import { DossierInfoPage } from './dossier-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DossierInfoPageRoutingModule
  ],
  declarations: [DossierInfoPage]
})
export class DossierInfoPageModule {}
