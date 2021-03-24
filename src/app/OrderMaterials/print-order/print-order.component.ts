import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.css']
})
export class PrintOrderComponent implements OnInit {

  constructor() { }

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

}
