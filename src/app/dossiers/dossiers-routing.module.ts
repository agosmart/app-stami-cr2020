import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DossiersPage } from './dossiers.page';

const routes: Routes = [
  {
    path: '',
    component: DossiersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DossiersPageRoutingModule {}
