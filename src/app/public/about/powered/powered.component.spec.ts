import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoweredComponent } from './powered.component';

describe('PoweredComponent', () => {
  let component: PoweredComponent;
  let fixture: ComponentFixture<PoweredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoweredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoweredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
