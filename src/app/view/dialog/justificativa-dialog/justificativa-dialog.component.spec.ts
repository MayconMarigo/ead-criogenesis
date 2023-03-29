import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificativaDialogComponent } from './justificativa-dialog.component';

describe('JustificativaDialogComponent', () => {
  let component: JustificativaDialogComponent;
  let fixture: ComponentFixture<JustificativaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustificativaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificativaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
