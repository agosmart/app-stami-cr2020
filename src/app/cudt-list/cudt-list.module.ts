import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CudtListPageRoutingModule } from './cudt-list-routing.module';

import { CudtListPage } from './cudt-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CudtListPageRoutingModule
  ],
  declarations: [CudtListPage]
})
export class CudtListPageModule {}
