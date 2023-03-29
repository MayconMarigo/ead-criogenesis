import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingControllerComponent } from './marketing-controller.component';

describe('MarketingControllerComponent', () => {
  let component: MarketingControllerComponent;
  let fixture: ComponentFixture<MarketingControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
