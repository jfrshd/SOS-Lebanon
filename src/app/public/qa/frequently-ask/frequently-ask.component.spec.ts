import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyAskComponent } from './frequently-ask.component';

describe('FrequentlyAskComponent', () => {
  let component: FrequentlyAskComponent;
  let fixture: ComponentFixture<FrequentlyAskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequentlyAskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequentlyAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
