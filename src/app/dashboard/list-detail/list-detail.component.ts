import { Component, OnInit } from '@angular/core';
import { ILink, IList, RequestStateEnum } from '../../models';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LinkService } from '../../services/link.service';
import { ListService } from '../../services/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  public list: IList = null;
  public links$: Observable<ILink[]> = null;

  public urlControl = new FormControl('', [Validators.required]);

  public requestState = RequestStateEnum.DEFAULT;
  public RequestStateEnum = RequestStateEnum;

  constructor(private linkService: LinkService,
              private listService: ListService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(
          paramMap => {
            const listId = paramMap.get('listId');
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
    this.requestState = RequestStateEnum.LOADING;

    this.linkService.create(this.list, this.urlControl.value)
      .subscribe(
        success => {
          this.urlControl.setValue('');

          this.requestState = RequestStateEnum.SUCCESS;

          this.links$ = this.linkService.getAll(this.list);
        },
        error => {
          this.requestState = RequestStateEnum.ERROR;
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
