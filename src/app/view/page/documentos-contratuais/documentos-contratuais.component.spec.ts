import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosContratuaisComponent } from './documentos-contratuais.component';

describe('DocumentosContratuaisComponent', () => {
  let component: DocumentosContratuaisComponent;
  let fixture: ComponentFixture<DocumentosContratuaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosContratuaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosContratuaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
