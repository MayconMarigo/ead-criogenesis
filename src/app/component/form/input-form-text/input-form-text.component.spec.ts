import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormTextComponent } from './input-form-text.component';

describe('InputFormTextComponent', () => {
  let component: InputFormTextComponent;
  let fixture: ComponentFixture<InputFormTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFormTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
