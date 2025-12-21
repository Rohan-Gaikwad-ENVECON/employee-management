import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ReportsComponent } from './components/reports/reports.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { AdminComponent } from './components/admin/admin.component';
import { DepartmentComponent } from './components/department/department.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'attendance', component: AttendanceComponent },
            { path: 'reports', component: ReportsComponent },
            {
                path: 'master',
                children: [
                    { path: '', redirectTo: 'employee', pathMatch: 'full' },
                    { path: 'employee', component: EmployeeListComponent },
                    { path: 'employee/new', component: EmployeeFormComponent },
                    { path: 'employee/edit/:id', component: EmployeeFormComponent },
                    { path: 'admin', component: AdminComponent },
                    { path: 'department', component: DepartmentComponent },
                    { path: 'configuration', component: ConfigurationComponent }
                ]
            }
        ]
    },
    { path: '**', redirectTo: '/dashboard' }
];
