import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateTestResultComponent } from './hr-associate-test-result.component';

describe('HrAssociateTestResultComponent', () => {
  let component: HrAssociateTestResultComponent;
  let fixture: ComponentFixture<HrAssociateTestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateTestResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
