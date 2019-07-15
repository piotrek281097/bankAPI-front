import { TestBed } from '@angular/core/testing';

import { ConfirmTransferDialogService } from './confirm-transfer-dialog.service';

describe('ConfirmTransferDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmTransferDialogService = TestBed.get(ConfirmTransferDialogService);
    expect(service).toBeTruthy();
  });
});
