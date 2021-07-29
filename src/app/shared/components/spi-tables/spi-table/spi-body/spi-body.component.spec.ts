import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiBodyComponent } from './spi-body.component';

describe('SpiBodyComponent', () => {
  let component: SpiBodyComponent;
  let fixture: ComponentFixture<SpiBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpiBodyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
