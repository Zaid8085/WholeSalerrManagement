import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorEntryComponent } from './distributor-entry.component';

describe('DistributorEntryComponent', () => {
  let component: DistributorEntryComponent;
  let fixture: ComponentFixture<DistributorEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
