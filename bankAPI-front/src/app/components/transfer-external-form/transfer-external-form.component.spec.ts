import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferExternalFormComponent } from './transfer-external-form.component';

describe('TransferExternalFormComponent', () => {
  let component: TransferExternalFormComponent;
  let fixture: ComponentFixture<TransferExternalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferExternalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferExternalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
