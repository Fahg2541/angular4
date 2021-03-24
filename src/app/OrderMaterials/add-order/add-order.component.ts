import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as html2pdf from 'html2pdf.js';
import { IDropdownSettings  } from 'ng-multiselect-dropdown';
import { es, de } from 'date-fns/locale';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { DatePickerOptions } from '@ngx-tiny/date-picker';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {

  @ViewChild('pdfTable') pdfTable: ElementRef;
  form: FormGroup;
  model: NgbDateStruct;
  range: FormGroup;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownSettingss:IDropdownSettings;

  myFormStart: FormGroup;
  myFormEnd: FormGroup;

  singleDatePickerOptions1: DatePickerOptions = {
    selectRange: false,
  };

  singleDatePickerOptions2: DatePickerOptions = {
    selectRange: false,
  };

  constructor(private fb: FormBuilder,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    public config: DateFnsConfigurationService,
    private _formBuilder: FormBuilder) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.form = this.fb.group({
      credentials: this.fb.array([]),
    });
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  Date(){
    this.myFormStart = this._formBuilder.group({
      singleDate: [new Date('01/01/2020')]
    });
    this.myFormEnd = this._formBuilder.group({
      singleDate: [new Date('01/01/2020')]
    });
  }

  onSubmitSingle() {
    alert(this.myFormStart.get('singleDate1').value);
  }

  onSubmitSingle1() {
    alert(this.myFormEnd.get('singleDate2').value);
  }


  downlondPDF() {
    const options = {
      filename: "OrderMaterials.pdf",
      html2canvas: {},
      jsPDF: { orientation: 'landscape' }
    };

    const content: Element = document.getElementById('element-to-export');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }

  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.fb.group({
      Material: ['', {
        validators: [this.isNameDuplicate()],
        updateOn: 'blur'
      }],
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
      const names = Material.map(item => item.Material.trim());
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

  changeToGerman() {
    this.config.setLocale(de);
  }
  changeToSpanish() {
    this.config.setLocale(es);
  }
}
