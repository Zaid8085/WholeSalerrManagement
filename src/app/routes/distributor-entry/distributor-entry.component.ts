import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-distributor-entry',
  templateUrl: './distributor-entry.component.html',
  styleUrls: ['./distributor-entry.component.scss']
})
export class DistributorEntryComponent implements OnInit {
  distributorform: FormGroup = this.fb.group({
    Distributor_Id: [ '' , Validators.required],
    Distributor_name: ['', Validators.required],
    address: ['', Validators.required],
    Mobile: ['', Validators.required],
    email: ['' , Validators.required],
    dealer_person_name: ['', Validators.required],
    Product_MRP: ['', Validators.required],
    Product_amount: ['', Validators.required],
    Quantity: ['', Validators.required],    
    Total_Amount: ['', Validators.required],
    Selling_price: ['', Validators.required],
    Profit: ['', Validators.required],
    Purchase_Date: ['', Validators.required],    
    City: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.warn(this.distributorform.value)
  }
  clearInputMethod1() {
    this.distributorform.reset()
  }
}
