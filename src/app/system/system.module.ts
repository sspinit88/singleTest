import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';

import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import {BillComponent} from './bill/bill.component';
import {HistoryComponent} from './history/history.component';
import {PlanningComponent} from './planning/planning.component';
import {RecordsComponent} from './records/records.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {DropdownDirective} from './shared/directives/Dropdown.directive';
import {AddEventComponent} from './records/add-event/add-event.component';
import {AddCategoryComponent} from './records/add-category/add-category.component';
import {EditCategoryComponent} from './records/edit-category/edit-category.component';
import {CategoriesService} from './shared/services/categories.service';
import {EventsService} from './shared/services/events.service';
import {BillService} from './shared/services/bill.service';
import {GraphComponent} from './history/graph/graph.component';
import {EventsComponent} from './history/events/events.component';
import {SearchPipe} from './shared/pipe/search.pipe';
import {NotFoundComponent} from '../shared/components/not-found/not-found.component';
import { DetailComponent } from './history/detail/detail.component';
import { FilterComponent } from './history/filter/filter.component';

@NgModule({
    declarations: [
        SystemComponent,
        BillComponent,
        HistoryComponent,
        PlanningComponent,
        RecordsComponent,
        HeaderComponent,
        SidebarComponent,
        DropdownDirective,
        AddEventComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        GraphComponent,
        EventsComponent,
        SearchPipe,
        NotFoundComponent,
        DetailComponent,
        FilterComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        SystemRoutingModule,
    ],
    exports: [],
    providers: [
        CategoriesService,
        EventsService,
        BillService
    ]
})

export class SystemModule {

}