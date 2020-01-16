import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CudtDetailsPage } from './cudt-details.page';

const routes: Routes = [
  {
    path: '',
    component: CudtDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CudtDetailsPageRoutingModule {}
