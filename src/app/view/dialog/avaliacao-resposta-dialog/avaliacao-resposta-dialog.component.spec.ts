import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoRespostaDialogComponent } from './avaliacao-resposta-dialog.component';

describe('AvaliacaoRespostaDialogComponent', () => {
  let component: AvaliacaoRespostaDialogComponent;
  let fixture: ComponentFixture<AvaliacaoRespostaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoRespostaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoRespostaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
