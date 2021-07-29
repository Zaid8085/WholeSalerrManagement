import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiTableComponent } from './spi-table.component';

describe('SpiTableComponent', () => {
  let component: SpiTableComponent;
  let fixture: ComponentFixture<SpiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpiTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
