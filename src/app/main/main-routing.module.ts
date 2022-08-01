import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [


                    // {
                    //     path: 'phonebook',
                    //     loadChildren: () => import('./phonebook/phonebook.module').then(m => m.PhoneBookModule)
                    // },
                    {
                        path: 'phonebook',
                        loadChildren: () => import('./phonebook/phonebook.module').then(m => m.PhoneBookModule),
                        data: { permission: 'Pages.Tenant.PhoneBook' }
                    },
                    {
                        path: 'customer',
                        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
                        data: { permission: 'Pages.Tenant.Customer' }

                    },
                    {
                        path: 'todo',
                        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
                        data: { permission: 'Pages.Tenant.Todo' }
                    },
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
                        data: { permission: 'Pages.Tenant.Dashboard' },
                    },
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'dashboard' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MainRoutingModule { }
