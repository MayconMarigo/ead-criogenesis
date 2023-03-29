import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceberEmailUsuarioComponent } from './receber-email-usuario.component';

describe('ReceberEmailUsuarioComponent', () => {
  let component: ReceberEmailUsuarioComponent;
  let fixture: ComponentFixture<ReceberEmailUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceberEmailUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceberEmailUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
