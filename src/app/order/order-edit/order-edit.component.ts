import { Component, OnInit } from '@angular/core';
import {SideNavModel} from '../../components/side-nav/side-nav-model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CalculationInputData, GluelamEntity, GluelamTypes, GlulamDetailEntity} from '../../model/glulam.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GlulamOrderService} from '../../model/glulam-order.service';
import {GluelamCalculatorService} from '../../model/gluelam-calculator.service';

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
  orderEntity: GluelamEntity;
  calculationResult = this.calculatorService.calculationResult;

  gluelamTypes = GluelamTypes.getInstance();

  private detailsIndex = 0;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private orderService: GlulamOrderService,
              private calculatorService: GluelamCalculatorService) { }

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

    this.orderForm.controls.laminationStrength.valueChanges.subscribe(value => {
      this.calculatorService.calculate(value as number);
    });

    this.details.valueChanges.subscribe(value => {

      const groups = value as [{[key: string]: any}];
      const last = groups[groups.length - 1];

      if (last.detailsAmount !== '' && last.detailsHeight !== '' && last.detailsLength !== '') {
        this.detailsIndex++;
        this.details.push(this.buildDetailGroup());
      }

      if (groups.length > 1) {
        const nextToLast = groups[groups.length - 2];
        console.log(nextToLast.detailsLength);
        if (last.detailsAmount === '' && last.detailsHeight === '' && last.detailsLength === '' && nextToLast.detailsLength === '') {
          this.details.removeAt(groups.length - 1);
          this.detailsIndex--;
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
    const group = this.formBuilder.group({
      detailsAmount: [''],
      detailsHeight: [''],
      detailsLength: [''],
      detailsLamella: [{value: '', disabled: true}],
      detailsSquare: [{value: '', disabled: true}],
      detailsSquareTotal: [{value: '', disabled: true}],
      detailsVolume: [{value: '', disabled: true}]
    });

    const index = this.detailsIndex;

    group.valueChanges.subscribe(value => {
      const changes = value as {[key: string]: any};
      this.calculate(changes, index);
    });

    return group;
  }

  private loadOrder(): void {
    const orderId = +this.route.snapshot.paramMap.get('orderId');
    console.log('orderId: ', orderId);
    if (orderId === -1) {
      this.orderEntity = new GluelamEntity();
      this.orderEntity.details.push(new GlulamDetailEntity());
      this.calculatorService.calculate(this.orderEntity.laminationStrength);
    } else {
      this.orderService.get(orderId).subscribe(orderEntity => {
        this.orderEntity = orderEntity;
        const value = Object.assign({}, orderEntity);
        this.orderForm.patchValue(value);
        this.details.push(this.buildDetailGroup());
        this.details.push(this.buildDetailGroup());
        this.details.push(this.buildDetailGroup());
        // this.details.setValue(orderEntity.details, {emitEvent: false});
        this.calculatorService.calculate(this.orderEntity.laminationStrength);
      });
    }
  }

  private calculate(group: {[key: string]: any}, index: number): void {
      if (group.detailsAmount !== '' && group.detailsHeight !== '' && group.detailsLength !== '') {
        const calculationInputData = new CalculationInputData();
        calculationInputData.amount = group.detailsAmount;
        calculationInputData.height = group.detailsHeight;
        calculationInputData.length = group.detailsLength;
        calculationInputData.width = this.orderForm.controls.width.value;
        calculationInputData.laminationStrength = this.orderForm.controls.laminationStrength.value;
        calculationInputData.additionalLength = this.orderForm.controls.additionalLength.value;
        const detail = this.calculatorService.calculateDetail(calculationInputData);
        if (this.orderEntity.details.length - 1 > index) {
          this.orderEntity.details.push(detail);
        } else {
          this.orderEntity.details[index] = detail;
        }
        const lastGroup = this.details.at(index) as FormGroup;
        lastGroup.patchValue({
          detailsLamella: detail.detailsLamella,
          detailsSquare: detail.detailsSquare,
          detailsSquareTotal: detail.detailsSquareTotal,
          detailsVolume: detail.detailsVolume
        }, {emitEvent: false});
    }
  }

}
