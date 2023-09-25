import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateAssignTestComponent } from './hr-associate-assign-test.component';

describe('HrAssociateAssignTestComponent', () => {
  let component: HrAssociateAssignTestComponent;
  let fixture: ComponentFixture<HrAssociateAssignTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateAssignTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateAssignTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
