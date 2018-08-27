import { Component, OnInit } from '@angular/core';
import {SideNavModel} from '../../components/side-nav/side-nav-model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GluelamEntity, GluelamTypes, GlulamDetailEntity} from '../../model/glulam.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GlulamOrderService} from '../../model/glulam-order.service';
import {GluelamCalculatorService} from '../../model/gluelam-calculator.service';
import {ValidationErrorMessages} from './form-definition';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  private static readonly calculationFormElements = ['laminationStrength', 'width', 'additionalLength', 'glueAmount', 'hardenerPercentage'];
  private static readonly inputFormElements = ['date', 'customer', 'elementNumber', 'laminationStrength',
                                               'width', 'additionalLength', 'glueAmount', 'hardenerPercentage'];

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

  gluelamTypes = GluelamTypes.getInstance();

  errors = new Map<string, string>();

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
      glueAmount: [380.00, [Validators.required, Validators.min(10)]],
      hardenerPercentage: [20.00, Validators.required],
      details: this.formBuilder.array([]),
    });

    this.registerInputValueChanges();

    this.details.valueChanges.subscribe(value => {

      const groups = value as [{[key: string]: any}];
      const last = groups[groups.length - 1];

      if (last.detailsAmount !== '' && last.detailsHeight !== '' && last.detailsLength !== '') {
        this.addRow();
      }

      if (groups.length > 1) {
        const nextToLast = groups[groups.length - 2];
        console.log(nextToLast.detailsLength);
        if (last.detailsAmount === '' && last.detailsHeight === '' && last.detailsLength === '' && nextToLast.detailsLength === '') {
          this.removeRow();
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

  private registerInputValueChanges(): void {
    OrderEditComponent.inputFormElements.forEach(element => {

      const control = this.orderForm.get(element);

      control.valueChanges.filter(value => {
        const hasError = (control.touched || control.dirty) && control.errors;
        if (hasError) {
          const errorText = ValidationErrorMessages.getErrorText(element, Object.keys(control.errors)[0]);
          this.errors.set(element, errorText);
        } else {
          this.errors.delete(element);
        }
        return !hasError;
      })

      .filter(value => {
        console.log('value is ', value);
        this.orderEntity[element] = value;
        return OrderEditComponent.calculationFormElements.includes(element);
      })

      .subscribe(value => {
        this.calculatorService.calculate(this.orderEntity);
      });

    });
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
      this.calculatorService.calculate(this.orderEntity);
      this.details.push(this.buildDetailGroup());

    } else {

      this.orderService.get(orderId).subscribe(orderEntity => {
        this.orderEntity = orderEntity;
        this.mapGluelamEntityToForm(orderEntity);
        orderEntity.details.forEach(detail => {
          const control = this.addRow();
          this.mapGluelamDetailEntityToForm(control, detail);
        });
        this.details.push(this.buildDetailGroup());
        this.calculatorService.calculate(this.orderEntity);
      });

    }
  }

  private calculate(group: {[key: string]: any}, index: number): void {
      if (group.detailsAmount !== '' && group.detailsHeight !== '' && group.detailsLength !== '') {

        this.orderEntity.width = +this.orderForm.controls.width.value;
        this.orderEntity.laminationStrength = +this.orderForm.controls.laminationStrength.value;
        this.orderEntity.additionalLength = +this.orderForm.controls.additionalLength.value;

        const detail = new GlulamDetailEntity();
        detail.detailsAmount = +group.detailsAmount;
        detail.detailsHeight = +group.detailsHeight;
        detail.detailsLength = +group.detailsLength;

        if (this.orderEntity.details.length - 1 > index) {
          this.orderEntity.details.push(detail);
        } else {
          this.orderEntity.details[index] = detail;
        }

        this.calculatorService.calculate(this.orderEntity);

        this.details.controls.forEach((formGroup: FormGroup, i) => {
          if (i < this.orderEntity.details.length) {
            this.mapGluelamDetailEntityToForm(formGroup, this.orderEntity.details[i]);
          }
        });

    }
  }

  private mapGluelamEntityToForm(orderEntity: GluelamEntity): void {
    this.orderForm.patchValue({
      date: orderEntity.date,
      customer: orderEntity.customer,
      elementNumber: orderEntity.elementNumber,
      laminationStrength: orderEntity.laminationStrength,
      quality: orderEntity.quality,
      press: orderEntity.press,
      woodType: orderEntity.woodType,
      glueTypeId: orderEntity.glueTypeId,
      hardenerTypeId: orderEntity.hardenerTypeId,
      width: orderEntity.width,
      additionalLength: orderEntity.additionalLength,
      glueAmount: orderEntity.glueAmount,
      hardenerPercentage: orderEntity.hardenerPercentage
    }, {emitEvent: false});
  }

  private mapGluelamDetailEntityToForm(formGroup: FormGroup, detail: GlulamDetailEntity): void {
    formGroup.patchValue({
      detailsAmount: detail.detailsAmount,
      detailsHeight: detail.detailsHeight,
      detailsLength: detail.detailsLength,
      detailsLamella: detail.detailsLamella,
      detailsSquare: detail.detailsSquare,
      detailsSquareTotal: detail.detailsSquareTotal,
      detailsVolume: detail.detailsVolume,
    }, {emitEvent: false});
  }

  private addRow(): FormGroup {
    this.detailsIndex++;
    const control = this.buildDetailGroup();
    this.details.push(control);

    return control;
  }

  private removeRow(): void {
    this.details.removeAt(this.details.length - 1);
    this.detailsIndex--;
  }

}
