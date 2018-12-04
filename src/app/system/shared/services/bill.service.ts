import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()

export class BillService {
    constructor(
        public http: HttpClient
    ) {
    }

    getBill(): Observable<any> {
        return this.http.get('http://localhost:3004/bill')
            .pipe(
                map((response) => {
                    return response;
                })
            );
    }

}