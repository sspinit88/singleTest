import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {UserService} from './shared/services/user.service';
import {SystemModule} from './system/system.module';
import {AuthService} from './shared/services/auth.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AuthModule,
        SharedModule,
        SystemModule
    ],
    providers: [
        UserService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
