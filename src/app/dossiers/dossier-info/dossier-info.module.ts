import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DossierInfoPageRoutingModule } from './dossier-info-routing.module';

import { DossierInfoPage } from './dossier-info.page';
import { ImagePageModule } from 'src/app/modal/image/image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DossierInfoPageRoutingModule,
    ImagePageModule,
  ],
  entryComponents: [],
  declarations: [DossierInfoPage, ]
})
export class DossierInfoPageModule {}
