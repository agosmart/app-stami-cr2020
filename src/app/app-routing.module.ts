import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home/:dataDoctorObj', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: () => import('./authentification/login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./authentification/register/register.module').then(m => m.RegisterPageModule) },
  {
    path: 'cudt-list',
    loadChildren: () => import('./cudt-list/cudt-list.module').then( m => m.CudtListPageModule)
  },

  {
    path: 'cudt-details/:etabId',
    loadChildren: () => import('./cudt-list/cudt-details/cudt-details.module').then( m => m.CudtDetailsPageModule)
  },
  
  {
    path: 'dossier-info/:idDossier',
    loadChildren: () => import('./cudt-list/dossier-info/dossier-info.module').then( m => m.DossierInfoPageModule)
  }
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
