import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAppComponent } from './services-app.component';

describe('ServicesAppComponent', () => {
  let component: ServicesAppComponent;
  let fixture: ComponentFixture<ServicesAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
