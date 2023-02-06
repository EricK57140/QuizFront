import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateCandidatesPageComponent } from './hr-associate-candidates-page.component';

describe('HrAssociateCandidatesPageComponent', () => {
  let component: HrAssociateCandidatesPageComponent;
  let fixture: ComponentFixture<HrAssociateCandidatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateCandidatesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateCandidatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
