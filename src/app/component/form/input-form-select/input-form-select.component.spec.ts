import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormSelectComponent } from './input-form-select.component';

describe('InputFormSelectComponent', () => {
  let component: InputFormSelectComponent;
  let fixture: ComponentFixture<InputFormSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFormSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
