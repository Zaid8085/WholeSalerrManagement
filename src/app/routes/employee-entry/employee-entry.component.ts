import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-entry',
  templateUrl: './employee-entry.component.html',
  styleUrls: ['./employee-entry.component.scss']
})
export class EmployeeEntryComponent implements OnInit {

  employeeform: FormGroup = this.fb.group({
    Emp_Id: [ '' ,Validators.required,Validators.minLength(3)],
    Emp_name: [ '' , Validators.required],
    Emp_role: [ '' , Validators.required],
    address: [ '' , Validators.required],
    email: [ '' ,[ Validators.required,Validators.email]],
    mobile_number: [ '' , Validators.required],
    salary: [ '' , Validators.required],
    joining_date: [ '' , Validators.required],
    aadhar_card: [ '' ,Validators.required],
    pan_card: [ '' , Validators.required],

  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.warn(this.employeeform.value)
  }
  clearInputMethod1() {
    this.employeeform.reset()
  }
}
