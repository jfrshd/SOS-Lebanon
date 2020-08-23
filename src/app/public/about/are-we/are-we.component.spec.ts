import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreWeComponent } from './are-we.component';

describe('AreWeComponent', () => {
  let component: AreWeComponent;
  let fixture: ComponentFixture<AreWeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreWeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreWeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
