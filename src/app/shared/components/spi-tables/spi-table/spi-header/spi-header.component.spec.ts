import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiHeaderComponent } from './spi-header.component';

describe('SpiHeaderComponent', () => {
  let component: SpiHeaderComponent;
  let fixture: ComponentFixture<SpiHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpiHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
