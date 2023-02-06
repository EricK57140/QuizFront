import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateCreateCandidateComponent } from './hr-associate-create-candidate.component';

describe('HrAssociateCreateCandidateComponent', () => {
  let component: HrAssociateCreateCandidateComponent;
  let fixture: ComponentFixture<HrAssociateCreateCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateCreateCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateCreateCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
