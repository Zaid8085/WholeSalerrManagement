import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {
  studentForm: FormGroup = this.fb.group({
    name: ['', Validators.required,],
    address: ['', Validators.required,],
    date: ['', Validators.required,],
    school: ['', Validators.required,],
    email: ['', Validators.required,],
    center_location: ['', Validators.required,],
    select: ['', Validators.required,],
    favorite: ['', Validators.required,],
    favorite_movement: ['', Validators.required,]
  });
  parentForm: FormGroup = this.fb.group({
    parent_name: ['', Validators.required,],
    address: ['', Validators.required,],
    email: ['', Validators.required,],
    primary_number: ['', Validators.required,],
    secondary_number: ['', Validators.required,],
    emergency_contact: ['', Validators.required,],
    name_of_relation: ['', Validators.required,],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit1() {
    console.warn(this.studentForm.value)
  }
  onSubmit2() {
    console.warn(this.parentForm.value)
  }
  clearInputMethod1() {
    this.studentForm.reset()
  }
  clearInputMethod2() {
    this.parentForm.reset()
  }
}
