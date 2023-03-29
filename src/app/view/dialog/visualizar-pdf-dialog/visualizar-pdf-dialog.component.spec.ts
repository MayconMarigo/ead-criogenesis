import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPdfDialogComponent } from './visualizar-pdf-dialog.component';

describe('VisualizarPdfDialogComponent', () => {
  let component: VisualizarPdfDialogComponent;
  let fixture: ComponentFixture<VisualizarPdfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarPdfDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarPdfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
