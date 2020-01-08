import { Component, OnInit } from '@angular/core';
import * as ListActions from '../../actions/list.actions';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IList } from '../../models';
import { selectListsAll, selectListsCreateLoading } from '../../selectors';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';

@Component({
  selector: 'app-no-list-selected',
  templateUrl: './no-list-selected.component.html',
  styleUrls: ['./no-list-selected.component.css']
})
export class NoListSelectedComponent implements OnInit {

  public lists$: Observable<IList[]> = this.store.select(selectListsAll);
  public listsCreateLoading$: Observable<boolean> = this.store.select(selectListsCreateLoading);

  public nameControl = new FormControl('', Validators.required);

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
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
