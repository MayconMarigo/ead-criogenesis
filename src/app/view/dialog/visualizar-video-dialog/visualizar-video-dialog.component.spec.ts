import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarVideoDialogComponent } from './visualizar-video-dialog.component';

describe('VisualizarVideoDialogComponent', () => {
  let component: VisualizarVideoDialogComponent;
  let fixture: ComponentFixture<VisualizarVideoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarVideoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
