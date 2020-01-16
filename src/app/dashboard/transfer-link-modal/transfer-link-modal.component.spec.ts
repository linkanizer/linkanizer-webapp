import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferLinkModalComponent } from './transfer-link-modal.component';

describe('TransferLinkModalComponent', () => {
  let component: TransferLinkModalComponent;
  let fixture: ComponentFixture<TransferLinkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferLinkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
