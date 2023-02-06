import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateEditCandidateComponent } from './hr-associate-edit-candidate.component';

describe('HrAssociateEditCandidateComponent', () => {
  let component: HrAssociateEditCandidateComponent;
  let fixture: ComponentFixture<HrAssociateEditCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateEditCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateEditCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
