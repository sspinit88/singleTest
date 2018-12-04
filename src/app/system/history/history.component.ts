import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';

import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../../shared/models/category.model';
import {AEvent} from '../../shared/models/event.model';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {

    sub: Subscription;

    constructor(
        private categoriesService: CategoriesService,
        private eventsService: EventsService
    ) {
    }

    categories: Category[] = [];
    events: AEvent[] = [];

    isLoaded = false;

    graphData = [];

    ngOnInit() {
        this.sub = combineLatest(
            this.categoriesService.getCategories(),
            this.eventsService.getEvents()
        ).subscribe((data: [Category[], AEvent[]]) => {
            this.categories = data[0];
            this.events = data[1];

            this.calculateGraphData();

            this.isLoaded = true;
        });
    }

    calculateGraphData(): void {
        this.graphData = [];

        this.categories.forEach((cat) => {
            const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
            this.graphData.push({
                name: cat.name,
                value: catEvent.reduce((total, e) => {
                    total += e.amount;
                    return total;
                }, 0)
            });
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
