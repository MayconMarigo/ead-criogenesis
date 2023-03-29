import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoAtivoDetalheComponent } from './curso-ativo-detalhe.component';

describe('CursoAtivoDetalheComponent', () => {
  let component: CursoAtivoDetalheComponent;
  let fixture: ComponentFixture<CursoAtivoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoAtivoDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoAtivoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
