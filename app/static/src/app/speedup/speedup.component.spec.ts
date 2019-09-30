import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedupComponent } from './speedup.component';

describe('SpeedupComponent', () => {
  let component: SpeedupComponent;
  let fixture: ComponentFixture<SpeedupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
