import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalTryComponent } from './signal-try.component';

describe('SignalTryComponent', () => {
  let component: SignalTryComponent;
  let fixture: ComponentFixture<SignalTryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignalTryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
