import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormCheckboxComponent } from './input-form-checkbox.component';

describe('InputFormCheckboxComponent', () => {
  let component: InputFormCheckboxComponent;
  let fixture: ComponentFixture<InputFormCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFormCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
