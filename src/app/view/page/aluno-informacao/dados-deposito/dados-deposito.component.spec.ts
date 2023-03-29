import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosDepositoComponent } from './dados-deposito.component';

describe('DadosDepositoComponent', () => {
  let component: DadosDepositoComponent;
  let fixture: ComponentFixture<DadosDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosDepositoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
