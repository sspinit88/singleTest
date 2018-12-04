import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    message: Message;

    constructor(private userServise: UserService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });

        this.message = new Message('danger', '');

        this.activatedRoute.queryParams
            .subscribe((params: Params) => {
                    if (params['canLogin']) {
                        this.showMessage('success', 'Вы можите войти в систему под своим логином и паролем.');
                    } else if (params['accessDenied']) {
                        this.showMessage('danger', 'Для входа в систему введите логин и пароль.');
                    }
                }
            );
    }

    private showMessage(type: string, text: string) {
        this.message = new Message(type, text);

        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }

    onSubmitForm() {
        const formData = this.form.value;

        this.userServise.getUserByEmail(formData.email)
            .subscribe((user: User) => {
                if (user) {
                    if (user.password) {
                        this.message.text = '';
                        window.localStorage.setItem('user', JSON.stringify(user));
                        this.showMessage('success', 'Добро пожаловать!');
                        this.router.navigate(['/system', 'bill']);
                        this.authService.login();
                    } else {
                        this.showMessage('danger', 'Пароль введен неверно!');
                    }
                } else {
                    this.showMessage('danger', 'Пользователь не зарегистрирован!');
                }
            });
    }

}
