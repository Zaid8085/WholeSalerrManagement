import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPlanSettingsComponent } from './diet-plan-settings.component';

describe('DietPlanSettingsComponent', () => {
  let component: DietPlanSettingsComponent;
  let fixture: ComponentFixture<DietPlanSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietPlanSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietPlanSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
