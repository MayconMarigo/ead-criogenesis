import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPendentesComponent } from './usuario-pendentes.component';

describe('UsuarioPendentesComponent', () => {
  let component: UsuarioPendentesComponent;
  let fixture: ComponentFixture<UsuarioPendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioPendentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
