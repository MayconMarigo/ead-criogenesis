import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosAtivosComponent } from './cursos-ativos.component';

describe('CursosAtivosComponent', () => {
  let component: CursosAtivosComponent;
  let fixture: ComponentFixture<CursosAtivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosAtivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosAtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
