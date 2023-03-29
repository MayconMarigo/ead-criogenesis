import { TestBed } from '@angular/core/testing';

import { MudancaPendenteGuardGuard } from './mudanca-pendente-guard.guard';

describe('MudancaPendenteGuardGuard', () => {
  let guard: MudancaPendenteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MudancaPendenteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
