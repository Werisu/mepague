import { Route } from '@angular/router';
import { ShellComponent } from './layout/shell.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@mepague/dashboard-feature').then((m) => m.DashboardComponent),
      },
      {
        path: 'nova-transacao',
        loadComponent: () =>
          import('@mepague/nova-transacao-feature').then(
            (m) => m.NovaTransacaoComponent
          ),
      },
      {
        path: 'historico',
        loadComponent: () =>
          import('@mepague/historico-feature').then(
            (m) => m.HistoricoComponent
          ),
      },
      {
        path: 'devedores',
        loadComponent: () =>
          import('@mepague/debtors-feature').then(
            (m) => m.DebtorsComponent
          ),
      },
    ],
  },
];
