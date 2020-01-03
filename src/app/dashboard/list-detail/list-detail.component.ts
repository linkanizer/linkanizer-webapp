import { Component, OnInit } from '@angular/core';
import { ILink, IList } from '../../models';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs/operators';
import { State } from '../../reducers';
import { ActionsSubject, Store } from '@ngrx/store';
import { selectListById } from '../../selectors/list.selectors';

import * as LinkActions from '../../actions/link.actions';
import * as ListActions from '../../actions/list.actions';
import { selectLinksAll, selectLinksCreateLoading, selectLinksRetrieveLoading } from '../../selectors/link.selectors';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  public list: IList = null;
  public links$: Observable<ILink[]> = this.store.select(selectLinksAll);
  public linkCreateLoading$: Observable<boolean> = this.store.select(selectLinksCreateLoading);
  public linkRetrieveLoading$: Observable<boolean> = this.store.select(selectLinksRetrieveLoading);

  public urlControl = new FormControl('', [Validators.required]);

  constructor(private store: Store<State>,
              private dispatcher: ActionsSubject,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(
          paramMap => {
            const listId = paramMap.get('listId');
            return this.store.select(selectListById, { id: listId });
          }
        ),
        filter(
          list => !!list
        )
      )
      .subscribe(
        list => {
          this.list = list;
          this.store.dispatch(LinkActions.getAllLinks({ list }));
        }
      );

    this.dispatcher
      .pipe(
        ofType(LinkActions.createLinkSuccess)
      )
      .subscribe(
        () => {
          this.urlControl.reset();
        }
      );
  }

  addLink(): void {
    const link: Partial<ILink> = {
      url: this.urlControl.value
    };

    this.store.dispatch(LinkActions.createLink({ list: this.list, link }));
  }

  deleteLink(link: ILink): void {
    this.store.dispatch(LinkActions.deleteLink({ link }));
  }

  deleteList(): void {
    this.store.dispatch(ListActions.deleteList({ list: this.list }));
  }

  openAll(): void {
    this.links$
      .pipe(
        take(1)
      )
      .subscribe(
        links => {
          for (const link of links) {
            window.open(link.url, '_blank');
          }
        }
      );
  }

}
