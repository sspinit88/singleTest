import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            'name': new FormControl(null, [Validators.required]),
            'capacity': new FormControl(0, [Validators.required, Validators.min(0)]),

        });
    }

    ngOnInit() {
    }

    onSubmit() {
        console.log(this.form);
    }

}
