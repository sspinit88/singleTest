import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [],
    imports: [
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule,
        BrowserAnimationsModule
    ],
    providers: [
        NgxChartsModule
    ]
})

export class SharedModule {
}