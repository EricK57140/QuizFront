import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateTopBannerComponent } from './hr-associate-top-banner.component';

describe('HrAssociateTopBannerComponent', () => {
  let component: HrAssociateTopBannerComponent;
  let fixture: ComponentFixture<HrAssociateTopBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateTopBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateTopBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
