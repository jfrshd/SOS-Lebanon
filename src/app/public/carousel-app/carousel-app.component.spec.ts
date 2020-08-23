import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselAppComponent } from './carousel-app.component';

describe('CarouselAppComponent', () => {
  let component: CarouselAppComponent;
  let fixture: ComponentFixture<CarouselAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
