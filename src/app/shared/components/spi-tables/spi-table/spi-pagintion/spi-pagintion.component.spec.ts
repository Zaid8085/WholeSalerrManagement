import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiPagintionComponent } from './spi-pagintion.component';

describe('SpiPagintionComponent', () => {
  let component: SpiPagintionComponent;
  let fixture: ComponentFixture<SpiPagintionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpiPagintionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiPagintionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
