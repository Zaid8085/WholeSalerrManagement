import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiSpinnerComponent } from './spi-spinner.component';

describe('SpiSpinnerComponent', () => {
  let component: SpiSpinnerComponent;
  let fixture: ComponentFixture<SpiSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpiSpinnerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
