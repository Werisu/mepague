import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@mepague/dashboard-feature').then((m) => m.DashboardComponent),
  },
];
