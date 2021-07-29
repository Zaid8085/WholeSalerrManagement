import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiRowComponent } from './spi-row.component';

describe('SpiRowComponent', () => {
  let component: SpiRowComponent;
  let fixture: ComponentFixture<SpiRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpiRowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
