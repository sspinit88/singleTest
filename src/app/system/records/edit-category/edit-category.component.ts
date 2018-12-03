import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Category} from '../../../shared/models/category.model';
import {CategoriesService} from '../../shared/services/categories.service';
import {Message} from '../../../shared/models/message.model';

@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

    @Input() categories: Category[] = [];
    @Output() editCategory = new EventEmitter<Category>();

    currentCategoryId = 1;
    currentCategory: Category;
    message: Message;

    constructor(
        private categoriesService: CategoriesService
    ) {

    }

    ngOnInit() {
        this.changeCategory();
        this.message = new Message('', '');
    }

    changeCategory() {
        this.currentCategory = this.categories
            .find(category => category.id === +this.currentCategoryId);
    }

    private showMessage(type: string, text: string) {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }

    onSubmit(form: NgForm) {
        let {name, capacity} = form.value;

        if (capacity < 0) {
            capacity *= -1;
        }

        let category = new Category(name, capacity, +this.currentCategoryId);

        this.categoriesService.editCategory(category)
            .subscribe(() => {
                this.message.text = '';
                this.editCategory.emit(category);
                this.showMessage('success', 'Категория отредактированна.');
            });
    }
}
