import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Starter Page',
    },
  },
];
