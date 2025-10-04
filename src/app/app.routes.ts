import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app-shell').then(c => c.AppShell),
    children: [
      {path: '', loadChildren: () => import('./constructor/constructor.routes').then(m => m.CONSTRUCTOR_ROUTES)}
    ]
  }
];
