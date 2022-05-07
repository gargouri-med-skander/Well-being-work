import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestePasswordComponent } from './reste-password.component';

describe('RestePasswordComponent', () => {
  let component: RestePasswordComponent;
  let fixture: ComponentFixture<RestePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
