import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateTestComponent } from './hr-associate-test.component';

describe('HrAssociateTestComponent', () => {
  let component: HrAssociateTestComponent;
  let fixture: ComponentFixture<HrAssociateTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
