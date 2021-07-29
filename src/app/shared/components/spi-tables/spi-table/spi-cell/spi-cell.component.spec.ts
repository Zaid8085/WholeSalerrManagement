import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiCellComponent } from './spi-cell.component';

describe('SpiCellComponent', () => {
  let component: SpiCellComponent;
  let fixture: ComponentFixture<SpiCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpiCellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
