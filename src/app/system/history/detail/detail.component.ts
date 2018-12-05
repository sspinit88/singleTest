import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {mergeMap} from 'rxjs/operators';

import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {AEvent} from '../../../shared/models/event.model';
import {Category} from '../../../shared/models/category.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

    event: AEvent;
    category: Category;

    isLoaded = false;
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private eventsService: EventsService,
        private categoriesService: CategoriesService
    ) {
    }

    ngOnInit() {
        // с помощью стрима получаем id страницы в коде
        // по id получим все данные, которые нужно отобразить на странице.
        this.sub = this.route.params
            .pipe(
                mergeMap((params: Params) => this.eventsService.getEventById(params['id'])),
                // получаем event и присваиваем его переменной event
                mergeMap((event: AEvent) => {
                    // получаем новый стрим
                    this.event = event;
                    return this.categoriesService.getCategoryById(event.category);
                })
            )
            // подписываемсяи получаем объект с данными
            .subscribe((category: Category) => {
                this.category = category;
                this.isLoaded = true;
            });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
