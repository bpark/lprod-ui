import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() page: number;
  @Input() count: number;
  @Input() totalPages: number;
  @Input() pageSize: number;
  @Input() routeTo: string;

  Math: Math = Math;

  constructor() { }

  ngOnInit(): void {
  }

}
