import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpgroupComponent } from './empgroup.component';

describe('EmpgroupComponent', () => {
  let component: EmpgroupComponent;
  let fixture: ComponentFixture<EmpgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpgroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
