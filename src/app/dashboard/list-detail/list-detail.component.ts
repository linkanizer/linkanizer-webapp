import { Component, OnInit } from '@angular/core';
import { ILink, IList, RequestStateEnum } from '../../models';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LinkService } from '../../services/link.service';
import { ListService } from '../../services/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { State } from '../../reducers';
import { Store } from '@ngrx/store';
import { selectListById } from '../../selectors/list.selectors';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  public list: IList = null;
  public links$: Observable<ILink[]> = null;

  public urlControl = new FormControl('', [Validators.required]);

  constructor(private linkService: LinkService,
              private listService: ListService,
              private store: Store<State>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.links$ = this.store.select(selectLinks)
    this.route.paramMap
      .pipe(
        switchMap(
          paramMap => {
            const listId = paramMap.get('listId');
            return this.store.select(selectListById);
            return this.listService.get(listId);
          }
        )
      )
      .subscribe(
        list => {
          this.list = list;
          this.links$ = this.linkService.getAll(list);
        }
      );
  }

  addLink(): void {

    this.linkService.create(this.list, this.urlControl.value)
      .subscribe(
        success => {
          this.urlControl.setValue('');


          this.links$ = this.linkService.getAll(this.list);
        },
        error => {
        }
      );
  }

  deleteLink(link: ILink): void {
    this.linkService.delete(link)
      .subscribe(
        success => {
          this.links$ = this.linkService.getAll(this.list);
        },
        error => {

        }
      );
  }

  deleteList(): void {
    this.listService.delete(this.list)
      .subscribe(
        success => {
          // TODO event or store sync
          this.router.navigate(['/dashboard/']);
        }
      );
  }

}
