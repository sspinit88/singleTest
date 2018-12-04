import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';

import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Bill} from '../../shared/models/bill.model';
import {Category} from '../../shared/models/category.model';
import {AEvent} from '../../shared/models/event.model';

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit, OnDestroy {

    isLoaded = false;

    sub1: Subscription;

    bill: Bill;
    categories: Category[] = [];
    events: AEvent[] = [];


    constructor(
        private billService: BillService,
        private categoriesService: CategoriesService,
        private eventService: EventsService
    ) {
    }

    ngOnInit() {
        this.sub1 = combineLatest(
            this.billService.getBill(),
            this.categoriesService.getCategories(),
            this.eventService.getEvents()
        ).subscribe((data: [Bill, Category[], AEvent[]]) => {
            this.bill = data[0];
            this.categories = data[1];
            this.events = data[2];

            this.isLoaded = true;
        });
    }

    ngOnDestroy() {
        // отписываемся от события
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }

    getCategoryCost(category): any {
        const categoryEvents = this.events
            .filter(event => event.category === category.id && event.type === 'outcome');

        return categoryEvents.reduce((total, event) => {
            total += event.amount;
            return total;
        }, 0);
    }

    private getPercent(category): any {
        const percent = (100 * this.getCategoryCost(category)) / category.capacity;
        return percent > 100 ? 100 : percent;
    }

    getCategoryPercent(category: Category): any {
        return this.getPercent(category) + '%';
    }

    getCategoryColorClass(category: Category): string {
        const percent = this.getPercent(category);
        const className = percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
        return className;
    }
}
