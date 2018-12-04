import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {mergeMap} from 'rxjs/operators';

import * as moment from 'moment';

import {Category} from '../../../shared/models/category.model';
import {EventsService} from '../../shared/services/events.service';
import {AEvent} from '../../../shared/models/event.model';
import {Bill} from '../../../shared/models/bill.model';
import {BillService} from '../../shared/services/bill.service';
import {Message} from '../../../shared/models/message.model';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

    @Input() categories: Category[] = [];

    message: Message;

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
        this.message = new Message('danger', '');
    }

    private showMessage(type: string, text: string) {
        this.message = new Message(type, text);

        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
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


        // получаем денежный счет
        this.billService.getBill()
            .subscribe((bill: Bill) => {
                let value = 0;
                // если был расход, то надо проверить, хватает ли средств для совершения события
                if (type === 'outcome') {
                    if (amount > bill.value) {
                        // нельзя потратить больше, чем есть на счете
                        this.message = new Message('danger', `Недостаточно средств! Вам не хватает: ${amount - bill.value}`);
                        return;
                    } else {
                        // вычитаем из счета величину затрат
                        value = bill.value - amount;
                    }
                } else {
                    // если доход, то складываем значения
                    value = bill.value + amount;
                }
                // в результате в/у действий получаем счет, который нужно обновить
                // создаем новый метод по обновлению счета в bill.service.ts
                this.billService.updateBill({value: value, currency: bill.currency})
                // нужно добавить в подписку this.eventsService.addEvent(event)
                // для того, что бы не писать два раза .subscribe() воспользуемся
                // методом margeMap
                    .pipe(
                        mergeMap(() => this.eventsService.addEvent(event))
                    )
                    .subscribe(() => {
                        // теперь нужно обнулить значения в форме, вместо метода .reset() воспользуемся setValue(), в нем укажем
                        // значения нужных нам полей.
                        form.setValue({
                            amount: 0,
                            description: ' ',
                            category: 1,
                            type: 'outcome'
                        });
                    });
            });
    }
}