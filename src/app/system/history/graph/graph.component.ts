import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

    @Input() data;
    // data = [
    //     {
    //         'name': 'ONE',
    //         'value': '321654'
    //     },
    //     {
    //         'name': 'TWO',
    //         'value': '753654'
    //     },
    //     {
    //         'name': 'THREE',
    //         'value': '654654'
    //     }
    // ];

    constructor() {
    }

    ngOnInit() {
    }

}
