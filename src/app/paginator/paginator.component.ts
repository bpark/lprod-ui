import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnDestroy {

  @Input() count: number;
  @Input() totalPages: number;
  page: number;
  pageSize: number;

  params: Params;
  url: string;

  Math: Math = Math;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params.hasOwnProperty('page') ? +params['page'] : 1;
      this.pageSize = params.hasOwnProperty('pageSize') ? +params['pageSize'] : 10;

      this.params = params;
      this.url = this.router.url.split('?')[0];

    });
  }

  ngOnDestroy(): void {
  }

  createParams(page: number): Params {
    const newParams = Object.assign({}, this.params);
    newParams['page'] = page;
    newParams['pageSize'] = 10;
    return newParams;
  }

}
