import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericoDialogComponent } from './generico-dialog.component';

describe('GenericoDialogComponent', () => {
  let component: GenericoDialogComponent;
  let fixture: ComponentFixture<GenericoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
