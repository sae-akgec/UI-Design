import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterylevelComponent } from './batterylevel.component';

describe('BatterylevelComponent', () => {
  let component: BatterylevelComponent;
  let fixture: ComponentFixture<BatterylevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatterylevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatterylevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
