import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAcessoComponent } from './login-acesso.component';

describe('LoginAcessoComponent', () => {
  let component: LoginAcessoComponent;
  let fixture: ComponentFixture<LoginAcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
