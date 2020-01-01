import { Component, OnInit } from '@angular/core';
import { IList } from '../../models';
import { FormControl, Validators } from '@angular/forms';
import { State } from '../../reducers';
import { ActionsSubject, Store } from '@ngrx/store';
import { selectListsAll, selectListsCreateLoading, selectListsRetrieveLoading } from '../../selectors/list.selectors';
import { Observable } from 'rxjs';
import { ofType } from '@ngrx/effects';

import * as ListActions from '../../actions/list.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public lists$: Observable<IList[]> = this.store.select(selectListsAll);
  public listsLoading$: Observable<boolean> = this.store.select(selectListsRetrieveLoading);
  public listsCreateLoading$: Observable<boolean> = this.store.select(selectListsCreateLoading);

  public nameControl = new FormControl('', Validators.required);

  constructor(private store: Store<State>,
              private dispatcher: ActionsSubject) {
  }

  ngOnInit() {
    this.store.dispatch(ListActions.getAllLists());

    this.dispatcher
      .pipe(
        ofType(ListActions.createListSuccess)
      )
      .subscribe(
        () => {
          this.nameControl.reset();
        }
      );
  }

  public createList(): void {
    this.store.dispatch(ListActions.createList({ list: { name: this.nameControl.value } }));
  }
}
