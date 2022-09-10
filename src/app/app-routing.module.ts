import { RoleComponent } from './pages/role/role.component';
import { ClientrequestComponent } from './pages/clientrequest/clientrequest.component';
import { TenantComponent } from './pages/tenant/tenant.component';
import { AuthGuard } from './authentication/services/auth.guard';
import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './layouts/main/main.component';
import { LoginComponent } from './authentication/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'tenant',
        component: TenantComponent
      },
      {
        path: 'client-request',
        component: ClientrequestComponent
      },
      {
        path: 'role',
        component: RoleComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
