import { Component, OnInit } from '@angular/core';
import { IList } from '../../models';
import { FormControl, Validators } from '@angular/forms';
import { State } from '../../reducers';
import { ActionsSubject, Store } from '@ngrx/store';
import { selectListsAll, selectListsCreateLoading, selectListsRetrieveLoading } from '../../selectors/list.selectors';
import { Observable } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { take } from 'rxjs/operators';

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

  public handleListDropped(event: CdkDragDrop<any>): void {
    this.lists$
      .pipe(
        take(1)
      )
      .subscribe(
        lists => {
          const list = lists[event.previousIndex];

          // Use 1-indexed order server side
          const order = event.currentIndex + 1;

          this.store.dispatch(ListActions.moveList({ list, new_order: order }));
        }
      );
  }
}
