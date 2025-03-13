import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatePassTestComponent } from './candidate-pass-test.component';

describe('CandidatePassTestComponent', () => {
  let component: CandidatePassTestComponent;
  let fixture: ComponentFixture<CandidatePassTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatePassTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatePassTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
