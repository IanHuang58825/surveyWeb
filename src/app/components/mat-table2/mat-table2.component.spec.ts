import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTable2Component } from './mat-table2.component';

describe('MatTable2Component', () => {
  let component: MatTable2Component;
  let fixture: ComponentFixture<MatTable2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTable2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
