import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewUpdateComponent } from './preview-update.component';

describe('PreviewUpdateComponent', () => {
  let component: PreviewUpdateComponent;
  let fixture: ComponentFixture<PreviewUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
