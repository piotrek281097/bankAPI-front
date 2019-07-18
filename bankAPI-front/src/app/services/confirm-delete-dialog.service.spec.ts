import { TestBed } from '@angular/core/testing';

import { ConfirmDeleteDialogService } from './confirm-delete-dialog.service';

describe('ConfirmDeleteDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmDeleteDialogService = TestBed.get(ConfirmDeleteDialogService);
    expect(service).toBeTruthy();
  });
});
