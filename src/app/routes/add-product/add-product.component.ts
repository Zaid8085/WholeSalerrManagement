import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnChanges {
  messages = [
    { "weight": "100gm" },
    { "weight": "250gm" },
    { "weight": "500gm" },
    { "weight": "750gm" },
    { "weight": "1kg" },
  ];
  options = [
    { "Catergory": "One" },
    { "Catergory": "Two" },
    { "Catergory": "Three" },
    { "Catergory": "Four" },
  ];
  taxes = [
    { "tin": "2.5%" },
    { "tin": "8%" },
    { "tin": "12%" },
    { "tin": "18%" },
  ];
  addform: FormGroup = this.fb.group({
    Select_Catergory: ['', Validators.required,],
    Product_name: [{ value: '', disabled: true }, Validators.required],
    Product_code: [{ value: '', disabled: true }, Validators.required],
    Brand: [{ value: '', disabled: true }, Validators.required],
    SKUS: [{ value: '', disabled: true }, Validators.required],
    Selling_price: [{ value: '', disabled: true }, Validators.required],
    Cost_price: [{ value: '', disabled: true }, Validators.required],
    Profit: [{ value: '', disabled: true }, Validators.required],
    Loss: [{ value: '', disabled: true }, Validators.required],
    GST: [{ value: '', disabled: true }, Validators.required],
    Total: [{ value: '', disabled: true }, Validators.required],
    Quantity: [{ value: '', disabled: true }, Validators.required],
    Expiry_date: [{ value: '', disabled: true }, Validators.required],
  });
  constructor(private fb: FormBuilder) { }
  ngOnChanges(): void {
    this.addform.controls['Select_Category'].valueChanges.subscribe(data => {
      console.log(data)
    })
  }


  ngOnInit(): void {


    console.log(this.addform.value)

  }
  onSelection(e) {
    console.log(e)
    this.addform.controls['Product_name'].enable();
    this.addform.controls['Product_code'].enable();
    this.addform.controls['Brand'].enable();
    this.addform.controls['SKUS'].enable();
    this.addform.controls['Selling_price'].enable();
    this.addform.controls['Cost_price'].enable();
    this.addform.controls['Profit'].enable();
    this.addform.controls['Loss'].enable();
    this.addform.controls['GST'].enable();
    this.addform.controls['Total'].enable();
    this.addform.controls['Quantity'].enable();
    this.addform.controls['Expiry_date'].enable();

  };
  onSubmit() {
    console.warn(this.addform.value)
  }
  clearInputMethod1() {
    this.addform.reset()
  }

}

