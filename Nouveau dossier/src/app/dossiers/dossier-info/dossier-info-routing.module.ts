import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DossierInfoPage } from './dossier-info.page';

const routes: Routes = [
  {
    path: '',
    component: DossierInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DossierInfoPageRoutingModule {}
