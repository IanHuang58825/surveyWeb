import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTabsComponent } from './survey-tabs.component';

describe('SurveyTabsComponent', () => {
  let component: SurveyTabsComponent;
  let fixture: ComponentFixture<SurveyTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
