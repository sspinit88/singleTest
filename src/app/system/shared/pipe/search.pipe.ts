import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterNamePipe'
})

export class SearchPipe implements PipeTransform {
    transform(items: any, value: string, field: string): any {
        if (items.length === 0 || !value) {
            return items;
        }
        return items.filter((item) => {
            // делаем глубокую копию объекта с помощью .assign()
            const t = Object.assign({}, item);
            // проверяем евляется ли числом то, что передали в функцию
            if (!isNaN(t[field])) {
                t[field] += '';
            }
            // для фильтрации по типу
            if (field === 'type') {
                t[field] = t[field] === 'outcome' ? 'расход' : 'доход';
            }
            // для фильтрации по категории
            if (field === 'category') {
                t[field] = t['catName'];
            }

            return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    }
}