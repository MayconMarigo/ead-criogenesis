import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarAdministradorComponent } from './gerenciar-administrador.component';

describe('GerenciarAdministradorComponent', () => {
  let component: GerenciarAdministradorComponent;
  let fixture: ComponentFixture<GerenciarAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciarAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
