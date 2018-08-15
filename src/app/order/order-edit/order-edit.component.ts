import { Component, OnInit } from '@angular/core';
import {SideNavModel} from '../../components/side-nav/side-nav-model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GluelamTypes} from '../../model/glulam.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GlulamOrderService} from '../../model/glulam-order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  sideNavModel: SideNavModel = {
    title: 'Leimbinder',
    items: [{
        id: 1,
        link: './',
        label: 'Bearbeiten'
      }]
  };

  orderForm: FormGroup;

  gluelamTypes = GluelamTypes.getInstance();

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private orderService: GlulamOrderService) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      customer: ['', Validators.required],
      elementNumber: ['', Validators.required],
      laminationStrength: [33.6, Validators.required],
      quality: [0, Validators.required],
      press: [0, Validators.required],
      woodType: [0, Validators.required],
      glueTypeId: [0, Validators.required],
      hardenerTypeId: [0, Validators.required],
      width: [8.5, Validators.required],
      additionalLength: [10.00, Validators.required],
      glueAmount: [380.00, Validators.required],
      hardenerPercentage: [20.00, Validators.required],
      details: this.formBuilder.array([this.buildDetailGroup()]),
    });

    this.details.valueChanges.subscribe(value => {
      const groups = value as {[key: string]: any};
      const last = groups[groups.length - 1];

      if (last.detailsAmount !== '' && last.detailsHeight !== '' && last.detailsLength !== '') {
        this.details.push(this.buildDetailGroup());
      }

      if (groups.length > 1) {
        const nextToLast = groups[groups.length - 2];
        console.log(nextToLast.detailsLength);
        if (last.detailsAmount === '' && last.detailsHeight === '' && last.detailsLength === '' && nextToLast.detailsLength === '') {
          this.details.removeAt(groups.length - 1);
        }
      }
    });

    this.loadOrder();
  }

  save() {
    console.log(this.orderForm.controls.customer.value);
    console.log(this.orderForm.controls.elementNumber.value);
    console.log(this.orderForm.controls.date.value);
    console.log(this.orderForm.controls.laminationStrength.value);
    console.log(this.orderForm.controls.quality.value);
    console.log(this.orderForm.controls.press.value);
    console.log(this.orderForm.controls.woodType.value);
    console.log(this.orderForm.controls.glueTypeId.value);
    console.log(this.orderForm.controls.hardenerTypeId.value);
    console.log(this.orderForm.controls.width.value);
    console.log(this.orderForm.controls.additionalLength.value);
    console.log(this.orderForm.controls.glueAmount.value);
    console.log(this.orderForm.controls.hardenerPercentage.value);
    // console.log(this.orderForm.controls.details.get('0').get('detailsAmount').value);
    // console.log(this.orderForm.controls.details.get('0').get('detailsHeight').value);
    // console.log(this.orderForm.controls.details.get('0').get('detailsLength').value);
    console.log(this.details.length);
    console.log(this.details);
  }

  get details(): FormArray {
    return <FormArray>this.orderForm.controls.details; // .get('details');
  }

  private buildDetailGroup(): FormGroup {
    return this.formBuilder.group({
      detailsAmount: [''],
      detailsHeight: [''],
      detailsLength: ['']
    });
  }

  private loadOrder(): void {
    const orderId = +this.route.snapshot.paramMap.get('orderId');
    console.log('orderid: ', orderId);
    if (orderId === -1) {

    } else {
      this.orderService.get(orderId).subscribe(orderEntity => {
        const value = Object.assign({}, orderEntity);
        this.orderForm.patchValue(value);
      });
    }
  }
}
