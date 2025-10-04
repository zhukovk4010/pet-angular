import { Routes } from '@angular/router';
export const CONSTRUCTOR_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./constructor').then(m => m.Constructor) },
];
