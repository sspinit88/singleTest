import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Category} from '../../../shared/models/category.model';

@Injectable()

export class CategoriesService {
    constructor(
        private http: HttpClient
    ) {
    }

    addCategory(category: Category): Observable<any> {
        return this.http.post(`http://localhost:3004/categories`, category)
            .pipe(
                map((response) => {
                    return response;
                })
            );
    }

    getCategories(): Observable<any> {
        return this.http.get('http://localhost:3004/categories')
            .pipe(
                map((response) => {
                    return response;
                })
            );
    }

    editCategory(category: Category): Observable<any> {
        return this.http.put(`http://localhost:3004/categories/${category.id}`, category)
            .pipe(
                map((response) => {
                    return response;
                })
            );
    }

}