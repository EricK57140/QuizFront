import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateTechnologiesComponent } from './hr-associate-technologies.component';

describe('HrAssociateTechnologiesComponent', () => {
  let component: HrAssociateTechnologiesComponent;
  let fixture: ComponentFixture<HrAssociateTechnologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateTechnologiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateTechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
