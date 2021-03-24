import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { from } from 'rxjs';
import { FormControl, FormGroup, FormArray, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;
  form: FormGroup;
  model: NgbDateStruct;

  constructor(private fb: FormBuilder,
    private calendar: NgbCalendar) { 
      this.form = this.fb.group({
        credentials: this.fb.array([]),
      });
    }

  ngOnInit(): void {
  }
  downlondPDF() {
    const options = {
      filename: "OrderMaterials.pdf",
      html2canvas: {},
      jsPDF: {orientation: 'landscape'}
    };

    const content:Element = document.getElementById('element-to-export');

    html2pdf()
      .from(content)
      .set(options)
      .save();
   }

  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.fb.group({
      Material: ['', {
        validators:[this.isNameDuplicate()],
        updateOn:'blur'}],
      Detail: '',
      Quantity: '',
      Price: '',
      PriceSum: ''
    }));
  }

  isNameDuplicate(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
    const Material = this.form.get("credentials").value;
    console.log(Material);
    const names = Material.map(item=> item.Material.trim());
    const hasDuplicate = names.some(
    (name, index) => names.indexOf(name, index + 1) != -1
  );

  if (hasDuplicate) {
    console.log(hasDuplicate);
    return { duplicate: true };
  }

  return null;
  }
}

}
