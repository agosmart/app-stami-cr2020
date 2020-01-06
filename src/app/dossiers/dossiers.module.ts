import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DossiersPageRoutingModule } from './dossiers-routing.module';

import { DossiersPage } from './dossiers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DossiersPageRoutingModule
  ],
  declarations: [DossiersPage]
})
export class DossiersPageModule {}
