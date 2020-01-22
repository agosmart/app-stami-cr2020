import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'onboard',
  //   pathMatch: 'full'
  // },
  /**********************************************
                - INTRO APP
************************************************/
  {
    path: "",
    redirectTo: "onboard",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () =>
      import("./authentification/login/login.module").then(
        m => m.LoginPageModule
      )
  },

  {
    path: "onboard",
    loadChildren: () =>
      import("./onboard/onboard.module").then(m => m.OnboardPageModule)
  },

  {
    path: "home/:dataDoctorObj",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },

  {
    path: "register",
    loadChildren: () =>
      import("./authentification/register/register.module").then(
        m => m.RegisterPageModule
      )
  },
  {
    path: "cudt-details/:etabId",
    loadChildren: () =>
      import("./dossiers/cudt-details/cudt-details.module").then(
        m => m.CudtDetailsPageModule
      )
  },
  {
    path: "dossier-infos/:idDossier",
    loadChildren: () =>
      import("./dossiers/dossier-info/dossier-info.module").then(
        m => m.DossierInfoPageModule
      )
  },
  {
    path: "dossiers",
    loadChildren: () =>
      import("./dossiers/dossiers.module").then(m => m.DossiersPageModule)
  },
  {
    path: "test-fcm",
    loadChildren: () =>
      import("./test-fcm/test-fcm.module").then(m => m.TestFcmPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
