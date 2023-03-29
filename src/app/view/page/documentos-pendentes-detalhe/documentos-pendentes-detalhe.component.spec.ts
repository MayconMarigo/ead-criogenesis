import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosPendentesDetalheComponent } from './documentos-pendentes-detalhe.component';

describe('DocumentosPendentesDetalheComponent', () => {
  let component: DocumentosPendentesDetalheComponent;
  let fixture: ComponentFixture<DocumentosPendentesDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosPendentesDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosPendentesDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
