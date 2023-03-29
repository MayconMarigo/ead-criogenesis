import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosContratuaisDialogComponent } from './documentos-contratuais-dialog.component';

describe('DocumentosContratuaisDialogComponent', () => {
  let component: DocumentosContratuaisDialogComponent;
  let fixture: ComponentFixture<DocumentosContratuaisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosContratuaisDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosContratuaisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
