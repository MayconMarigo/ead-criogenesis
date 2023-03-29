import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarImagemDialogComponent } from './visualizar-imagem-dialog.component';

describe('VisualizarImagemDialogComponent', () => {
  let component: VisualizarImagemDialogComponent;
  let fixture: ComponentFixture<VisualizarImagemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarImagemDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarImagemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
