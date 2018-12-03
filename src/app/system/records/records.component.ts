import {Component, OnInit} from '@angular/core';

import {Category} from '../../shared/models/category.model';
import {CategoriesService} from '../shared/services/categories.service';

@Component({
    selector: 'app-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

    categories: Category[] = [];
    isLoaded = false;

    constructor(
        private categoriesService: CategoriesService
    ) {
    }

    ngOnInit() {
        this.categoriesService.getCategories()
            .subscribe((categories: Category[]) => {
                this.categories = categories;
                this.isLoaded = true;
            });
    }

    addNewCategory(category: Category) {
        this.categories.push(category);
    }

    categoriesWasEdited(category: Category) {
        console.log(category);
        // находим переданную переменную в массиве по id и меняем ее
        // const index = this.categories.findIndex(c => c.id === category.id);
        // this.categories[index] = category;
        // console.log(this.categories[index]);
    }

}
