import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEntryComponent } from './employee-entry.component';

describe('EmployeeEntryComponent', () => {
  let component: EmployeeEntryComponent;
  let fixture: ComponentFixture<EmployeeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
