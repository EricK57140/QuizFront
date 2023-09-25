import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateTryTestComponent } from './hr-associate-try-test.component';

describe('HrAssociateTryTestComponent', () => {
  let component: HrAssociateTryTestComponent;
  let fixture: ComponentFixture<HrAssociateTryTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateTryTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateTryTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
