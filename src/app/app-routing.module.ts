import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoIngresarGuard } from './noingresar.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule),
    canActivate:[NoIngresarGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./Pages/inicio/inicio.module').then( m => m.InicioPageModule),
  },
  
  {
    path: 'formularios',
    loadChildren: () => import('./Pages/formularios/formularios.module').then( m => m.FormulariosPageModule),
  },
  {
    path: 'ficha',
    loadChildren: () => import('./Pages/ficha/ficha.module').then( m => m.FichaPageModule),
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./Pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule),
  },
  {
    path: '**',
    loadChildren: () => import('./Pages/not-found404/not-found404.module').then( m => m.NotFound404PageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
