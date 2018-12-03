import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {appEvent} from '../../../shared/models/event.model';


@Injectable()

export class EventsService {
    constructor(
        private http: HttpClient
    ) {
    }

    addEvent(event: appEvent): Observable<appEvent> {
        return this.http.post('http://localhost:3004/events', event)
            .pipe(
                map((response) => {
                    return response;
                })
            );
    }
}