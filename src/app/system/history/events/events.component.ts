import {Component, Input, OnInit} from '@angular/core';
import {AEvent} from '../../../shared/models/event.model';
import {Category} from '../../../shared/models/category.model';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

    @Input() categories: Category[] = [];
    @Input() events: AEvent[] = [];

    searchValue = '';
    searchPlaceholder = 'Сумма';
    searchFieldType = 'amount';

    constructor() {
    }

    ngOnInit() {
        this.events.forEach((e) => {
            e.catName = this.categories.find(c => c.id === e.category).name;
        });
    }

    getClassName(e) {
        return {
            'label': true,
            'label-danger-e': e.type === 'outcome',
            'label-success-e': e.type === 'income'
        };
    }

    changeCriteria(fieldType: string) {
        // создаем карту имен
        const namesMap = {
            amount: 'Сумма',
            date: 'Дата',
            category: 'Категория',
            type: 'Тип'
        };
        // в зависимости от поля будем задавать placeholder'у определенное значение
        this.searchPlaceholder = namesMap[fieldType];
        // указываем какое поле актуально для поиска
        this.searchFieldType = fieldType;
    }
}
