import { Routes } from '@angular/router';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: SchoolDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
];
