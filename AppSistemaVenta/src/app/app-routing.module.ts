import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: "full" }, // Ruta inicial cundo no hay nada
  { path: 'login', component: LoginComponent, pathMatch: "full" }, // Ruta inicial
  { path: 'pages', loadChildren: () => import('./Components/layout/layout.module').then(m => m.LayoutModule) }, // Lazy load account module
  { path: '**', redirectTo: 'login', pathMatch: "full"  } // Cuando la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
