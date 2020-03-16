import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DossiersPageRoutingModule } from './dossiers-routing.module';

import { DossiersPage } from './dossiers.page';

//-------- Custom Components Notification on Multiple Pages in Ionic
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DossiersPageRoutingModule,
    // - Custom Components on Multiple Pages in Ionic
    ComponentsModule
  ],
  declarations: [DossiersPage]
})
export class DossiersPageModule { }
