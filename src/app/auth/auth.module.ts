import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {SharedModule} from '../shared/shared.module';
import {AuthComponent} from './auth.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule
    ],
    exports: [],
    providers: []
})

export class AuthModule {
}