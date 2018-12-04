import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import * as moment from 'moment';

import {Category} from '../../../shared/models/category.model';
import {EventsService} from '../../shared/services/events.service';
import {AEvent} from '../../../shared/models/event.model';
import {Bill} from '../../../shared/models/bill.model';
import {BillService} from '../../shared/services/bill.service';

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
        private eventsService: EventsService,
        private billService: BillService
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

        // не допустимы отрицательные числа
        if (amount < 0) {
            amount *= -1;
        }

        // не забыть подключить moment.js
        const event = new AEvent(
            type,
            amount,
            +category,
            moment().format('DD.MM.YYYY HH.mm.ss'),
            description
        );

        this.eventsService.addEvent(event)
            .subscribe((bill: Bill) => {

            });
    }
}