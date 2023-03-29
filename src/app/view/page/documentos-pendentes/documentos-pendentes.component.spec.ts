import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosPendentesComponent } from './documentos-pendentes.component';

describe('DocumentosPendentesComponent', () => {
  let component: DocumentosPendentesComponent;
  let fixture: ComponentFixture<DocumentosPendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosPendentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
