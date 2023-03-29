import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoStatusComponent } from './documento-status.component';

describe('DocumentoStatusComponent', () => {
  let component: DocumentoStatusComponent;
  let fixture: ComponentFixture<DocumentoStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
