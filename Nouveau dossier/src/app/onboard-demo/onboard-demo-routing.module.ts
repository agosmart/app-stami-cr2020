import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardDemoPage } from './onboard-demo.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardDemoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardDemoPageRoutingModule {}
