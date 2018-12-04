import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AEvent} from '../../../shared/models/event.model';

@Injectable()

export class EventsService {
    constructor(
        private http: HttpClient
    ) {
    }

    addEvent(event: AEvent): Observable<any> {
        return this.http.post('http://localhost:3004/events', event)
            .pipe(
                map((response) => {
                    return response;
                })
            );
    }

    getEvents(): Observable<any> {
        return this.http.get('http://localhost:3004/events')
            .pipe(
                map((response) => {
                    return response;
                })
            );
    }
}