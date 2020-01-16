import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILink, IList } from '../../models';
import { ActionsSubject, Store } from '@ngrx/store';
import { State } from '../../reducers';
import { selectLinksTransferLoading, selectListsAll } from '../../selectors';
import { Observable } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { FormControl, Validators } from '@angular/forms';

import * as LinkActions from '../../actions/link.actions';

@Component({
  selector: 'app-transfer-link-modal',
  templateUrl: './transfer-link-modal.component.html',
  styleUrls: ['./transfer-link-modal.component.css']
})
export class TransferLinkModalComponent implements OnInit {

  loading$: Observable<boolean> = this.store.select(selectLinksTransferLoading);
  lists$: Observable<IList[]> = this.store.select(selectListsAll);

  public listSelect = new FormControl(null, Validators.required);

  @Input()
  public link: ILink = null;

  constructor(public activeModal: NgbActiveModal,
              private store: Store<State>,
              private dispatcher: ActionsSubject) {
  }

  ngOnInit(): void {
    // listen for "transfer complete" event to close modal
    this.dispatcher
      .pipe(
        ofType(LinkActions.transferLinkSuccess)
      )
      .subscribe(
        () => {
          this.activeModal.close();
        }
      );

  }

  public submit(): void {
    const payload = {
      link: this.link,
      list: this.listSelect.value
    };

    this.store.dispatch(LinkActions.transferLink(payload));
  }
}
