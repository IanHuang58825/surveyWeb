import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTabsComponent } from './update-tabs.component';

describe('UpdateTabsComponent', () => {
  let component: UpdateTabsComponent;
  let fixture: ComponentFixture<UpdateTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
