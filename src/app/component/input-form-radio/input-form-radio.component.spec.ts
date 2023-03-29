import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormRadioComponent } from './input-form-radio.component';

describe('InputFormRadioComponent', () => {
  let component: InputFormRadioComponent;
  let fixture: ComponentFixture<InputFormRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFormRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
