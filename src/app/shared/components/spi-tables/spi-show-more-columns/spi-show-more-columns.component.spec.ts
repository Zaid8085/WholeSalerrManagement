import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiShowMoreColumnsComponent } from './spi-show-more-columns.component';

describe('SpiShowMoreColumnsComponent', () => {
  let component: SpiShowMoreColumnsComponent;
  let fixture: ComponentFixture<SpiShowMoreColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpiShowMoreColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiShowMoreColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
