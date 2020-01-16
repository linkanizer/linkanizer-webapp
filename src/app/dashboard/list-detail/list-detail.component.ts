import { Component, OnInit } from '@angular/core';
import { ILink, IList } from '../../models';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs/operators';
import { State } from '../../reducers';
import { ofType } from '@ngrx/effects';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActionsSubject, Store } from '@ngrx/store';
import { selectLinksCreateLoading, selectLinksForList, selectLinksRetrieveLoading, selectListById } from '../../selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as LinkActions from '../../actions/link.actions';
import * as ListActions from '../../actions/list.actions';
import { TransferLinkModalComponent } from '../transfer-link-modal/transfer-link-modal.component';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  public list: IList = null;
  public displayMode: 'list' | 'cards' = 'list';
  public links$: Observable<ILink[]> = null;
  public linkCreateLoading$: Observable<boolean> = this.store.select(selectLinksCreateLoading);
  public linkRetrieveLoading$: Observable<boolean> = this.store.select(selectLinksRetrieveLoading);

  public urlControl = new FormControl('', [Validators.required]);

  constructor(private store: Store<State>,
              private dispatcher: ActionsSubject,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal) {
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
        }
      );

    this.links$ = this.route.paramMap
      .pipe(
        switchMap(
          paramMap => this.store.select(selectLinksForList, { listId: paramMap.get('listId') })
        ),
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

            this.store.dispatch(LinkActions.visitLink({ link }));
          }
        }
      );
  }

  onLinkVisit(link: ILink): boolean {
    this.store.dispatch(LinkActions.visitLink({ link }));

    return true;
  }

  handleLinkDropped(event: CdkDragDrop<any>): void {
    this.links$
      .pipe(
        take(1)
      )
      .subscribe(
        links => {
          const link = links[event.previousIndex];

          // Use 1-indexed order server side
          const order = event.currentIndex + 1;

          this.store.dispatch(LinkActions.moveLink({ link, new_order: order }));
        }
      );
  }

  transferLink(link: ILink): void {
    const modalRef = this.modalService.open(TransferLinkModalComponent);
    modalRef.componentInstance.link = link;
  }

}
