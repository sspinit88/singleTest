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
import {AuthGuard} from './shared/services/auth.guard';

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
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
