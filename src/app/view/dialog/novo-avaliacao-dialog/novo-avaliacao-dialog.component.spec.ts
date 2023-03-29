import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoAvaliacaoDialogComponent } from './novo-avaliacao-dialog.component';

describe('NovoAvaliacaoDialogComponent', () => {
  let component: NovoAvaliacaoDialogComponent;
  let fixture: ComponentFixture<NovoAvaliacaoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoAvaliacaoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoAvaliacaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
