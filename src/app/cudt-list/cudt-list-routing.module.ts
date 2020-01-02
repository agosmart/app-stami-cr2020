import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CudtListPage } from './cudt-list.page';

const routes: Routes = [
  {
    path: '',
    component: CudtListPage
  },
  // {
  //   path: 'cudt-details',
  //   loadChildren: () => import('./cudt-details/cudt-details.module').then( m => m.CudtDetailsPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CudtListPageRoutingModule {}
