import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorDetailsComponent } from './distributor-details.component';

describe('DistributorDetailsComponent', () => {
  let component: DistributorDetailsComponent;
  let fixture: ComponentFixture<DistributorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
