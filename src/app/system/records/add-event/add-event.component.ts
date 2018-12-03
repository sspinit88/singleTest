import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Category} from '../../../shared/models/category.model';
import {appEvent} from '../../../shared/models/event.model';
import * as moment from 'moment';
import {EventsService} from '../../shared/services/events.service';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

    @Input() categories: Category[] = [];

    private types = [
        {
            type: 'income',
            label: 'Доход'
        },
        {
            type: 'outcome',
            label: 'Расход'
        }
    ];

    constructor(
        private eventsService: EventsService
    ) {
    }

    ngOnInit() {

    }

    onSubmit(form: NgForm) {
        let {
            amount,
            description,
            category,
            type
        } = form.value;

        if (amount < 0) {
            amount *= -1;
        }

        const appEvent = new appEvent(
            type,
            amount,
            +category,
            moment().format('DD.MM.YYYY HH.mm.ss'),
            description
        );

        this.eventsService.addEvent(appEvent)
            .subscribe(() => {

            });
    }
}