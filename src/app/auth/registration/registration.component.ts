import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    form: FormGroup;

    constructor(private userServise: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'name': new FormControl(null, [Validators.required]),
            'agree': new FormControl(null, [Validators.requiredTrue])
        });
    }

    onSubmitForm() {
        const {email, password, name} = this.form.value;
        const user = new User(email, password, name);
        console.log(this.form);
        this.userServise.createNewUser(user)
            .subscribe(() => {
                this.router.navigate(['/login'], {
                    queryParams: {
                        canLogin: true
                    }
                });
            });
    }

    forbiddenEmails(control: FormControl): Promise<any> {
        return new Promise((res, rej) => {
            // control.value - текущее значение input'a
            this.userServise.getUserByEmail(control.value)
                .subscribe((user: User) => {
                    if (user) {
                        // если пользователь с введенным email уже есть
                        // передаем ключ 'forbiddenEmail: true', по которому будем делать валидации
                        res({forbiddenEmail: true});
                    } else {
                        // если пользователя с введенным email нет
                        res(null);
                    }
                });
        });
    }


}
