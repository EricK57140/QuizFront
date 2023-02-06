import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateCreateTestComponent } from './hr-associate-create-test.component';

describe('HrAssociateCreateTestComponent', () => {
  let component: HrAssociateCreateTestComponent;
  let fixture: ComponentFixture<HrAssociateCreateTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateCreateTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateCreateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
