import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';

@NgModule({
    declarations: [],
    imports: [
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
    ]
})

export class SharedModule {
}