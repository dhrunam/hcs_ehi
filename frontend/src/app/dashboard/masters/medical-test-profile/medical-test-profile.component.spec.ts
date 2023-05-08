import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestProfileComponent } from './medical-test-profile.component';

describe('MedicalTestProfileComponent', () => {
  let component: MedicalTestProfileComponent;
  let fixture: ComponentFixture<MedicalTestProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTestProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTestProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
