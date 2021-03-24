import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {

  dataArr: any;
  form: FormGroup;
  id: any;
  // OrderMaterials = new OrderMaterials();
  date: any;
  from: Date
  to: Date

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    // private OrderM: OrderMaterialsService,
    private route: ActivatedRoute) {
      this.form = this.fb.group({
        credentials: this.fb.array([]),
      });
  }

  ngOnInit() {
    this.createForm();
    // this.orderMaterial();
  }

  createForm()
  {
    this.form = this.fb.group({
      supplier_name: ['', [Validators.required]],
      start_date: [''],
      end_date: [''],
      material_name: ['', [Validators.required]],
      detail: [''],
      quantity: ['', [Validators.required,Validators.minLength(0),]],
      price: ['', [Validators.required,Validators.minLength(0),]],
      status_order: ['', [Validators.required]],
      sum_quantity: ['', [Validators.minLength(0),]],
      sum_price: ['', [Validators.minLength(0),]],
      order_name: ['', [Validators.required]]
    })
  }

  // orderMaterial()
  // {
  //   this.OrderM.getData1(this.dataArr).subscribe((res: any) =>{
  //     this.dataArr = res.data;
  //   })
  // }

  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.fb.group({
      material_name: ['', {
        validators: [this.isNameDuplicate()],
        updateOn: 'blur'
      }],
      detail: '',
      quantity: '',
      price: '',
      sum_quantity: '',
      sum_price: ''
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


  // downlondPDF() {
  //   const options = {
  //     filename: "OrderMaterials.pdf",
  //     html2canvas: {},
  //     jsPDF: { orientation: 'landscape' }
  //   };

  //   const content: Element = document.getElementById('element-to-export');

  //   html2pdf()
  //     .from(content)
  //     .set(options)
  //     .save();
  // }

  updateFromDate(source) {
    this.from = source.target.valueAsDate;
  }
  updateToDate(source) {
    this.to = source.target.valueAsDate;
  }
}
