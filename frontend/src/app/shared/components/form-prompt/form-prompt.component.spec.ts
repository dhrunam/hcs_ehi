import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPromptComponent } from './form-prompt.component';

describe('FormPromptComponent', () => {
  let component: FormPromptComponent;
  let fixture: ComponentFixture<FormPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPromptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
