import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarSenhaDialogComponent } from './recuperar-senha-dialog.component';

describe('RecuperarSenhaDialogComponent', () => {
  let component: RecuperarSenhaDialogComponent;
  let fixture: ComponentFixture<RecuperarSenhaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarSenhaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarSenhaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
