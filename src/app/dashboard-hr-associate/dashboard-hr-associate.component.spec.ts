import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHrAssociateComponent } from './dashboard-hr-associate.component';

describe('DashboardHrAssociateComponent', () => {
  let component: DashboardHrAssociateComponent;
  let fixture: ComponentFixture<DashboardHrAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardHrAssociateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHrAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
