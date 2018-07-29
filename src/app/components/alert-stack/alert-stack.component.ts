import {Component, Input, OnInit} from '@angular/core';
import {AlertStackModel} from './alert-stack.model';

@Component({
  selector: 'app-alert-stack',
  templateUrl: './alert-stack.component.html',
  styleUrls: ['./alert-stack.component.css']
})
export class AlertStackComponent implements OnInit {

  @Input() alertStackModel: AlertStackModel;

  constructor() { }

  ngOnInit() {
  }

}
