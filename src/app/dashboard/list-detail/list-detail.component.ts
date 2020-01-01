import { Component, OnInit } from '@angular/core';
import { ILink, IList } from '../../models';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { State } from '../../reducers';
import { Store } from '@ngrx/store';
import { selectListById } from '../../selectors/list.selectors';

import * as LinkActions from '../../actions/link.actions';
import * as ListActions from '../../actions/list.actions';
import { selectLinks, selectLinksAll, selectLinksCreateLoading, selectLinksRetrieveLoading } from '../../selectors/link.selectors';

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
  }

  addLink(): void {
    const link: Partial<ILink> = {
      url: this.urlControl.value
    };

    this.store.dispatch(LinkActions.createLink({ list: this.list, link }));

    // TODO how to clear urlControl value after submission complete?
    // TODO update links store on update?
    // this.urlControl.setValue('');
    //           this.links$ = this.linkService.getAll(this.list);
  }

  deleteLink(link: ILink): void {
    this.store.dispatch(LinkActions.deleteLink({ link }));
  }

  deleteList(): void {
    this.store.dispatch(ListActions.deleteList({list: this.list}));

    // TODO event or store sync
    // this.router.navigate(['/dashboard/']);
  }

}
