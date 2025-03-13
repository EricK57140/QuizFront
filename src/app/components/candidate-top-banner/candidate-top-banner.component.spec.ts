import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateTopBannerComponent } from './candidate-top-banner.component';

describe('CandidateTopBannerComponent', () => {
  let component: CandidateTopBannerComponent;
  let fixture: ComponentFixture<CandidateTopBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateTopBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateTopBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
