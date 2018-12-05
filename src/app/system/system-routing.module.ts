import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {BillComponent} from './bill/bill.component';
import {HistoryComponent} from './history/history.component';
import {PlanningComponent} from './planning/planning.component';
import {RecordsComponent} from './records/records.component';
import {AuthGuard} from '../shared/services/auth.guard';

import {NotFoundComponent} from '../shared/components/not-found/not-found.component';
import {DetailComponent} from './history/detail/detail.component';

const routes: Routes = [
    {
        path: 'system', component: SystemComponent, canActivate: [AuthGuard], children: [
            {
                path: 'bill', component: BillComponent
            },
            {
                path: 'history', component: HistoryComponent
            },
            {
                path: 'planning', component: PlanningComponent
            },
            {
                path: 'records', component: RecordsComponent
            },
            {
                path: 'history/:id', component: DetailComponent
            }
        ]
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})

export class SystemRoutingModule {

}