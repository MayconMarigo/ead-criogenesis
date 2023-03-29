import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarCursoComponent } from './gerenciar-curso.component';

describe('GerenciarCursoComponent', () => {
  let component: GerenciarCursoComponent;
  let fixture: ComponentFixture<GerenciarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciarCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
