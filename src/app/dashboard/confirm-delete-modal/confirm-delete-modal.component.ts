import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent implements OnInit {

  @Input()
  public name = '';

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {

  }

  public submit(): void {
    this.activeModal.close('delete');
  }
}
