import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoInformacaoComponent } from './aluno-informacao.component';

describe('AlunoInformacaoComponent', () => {
  let component: AlunoInformacaoComponent;
  let fixture: ComponentFixture<AlunoInformacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoInformacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoInformacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
