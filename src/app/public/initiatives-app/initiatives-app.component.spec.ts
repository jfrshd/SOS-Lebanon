import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativesAppComponent } from './initiatives-app.component';

describe('InitiativesAppComponent', () => {
  let component: InitiativesAppComponent;
  let fixture: ComponentFixture<InitiativesAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativesAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativesAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
