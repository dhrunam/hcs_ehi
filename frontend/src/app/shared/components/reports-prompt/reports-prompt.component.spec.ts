import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsPromptComponent } from './reports-prompt.component';

describe('ReportsPromptComponent', () => {
  let component: ReportsPromptComponent;
  let fixture: ComponentFixture<ReportsPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsPromptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
