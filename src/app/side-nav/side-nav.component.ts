import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SideNavModel} from './side-nav-model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {

  @Input() sideNavModel: SideNavModel;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
