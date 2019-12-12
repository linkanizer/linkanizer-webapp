import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILink, IList, RequestStateEnum } from '../../models';
import { FormControl, Validators } from '@angular/forms';
import { LinkService } from '../../services/link.service';
import { Observable } from 'rxjs';
import { ListService } from '../../services/list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lists-detail',
  templateUrl: './lists-detail.component.html',
  styleUrls: ['./lists-detail.component.css']
})
export class ListsDetailComponent implements OnInit {

  @Input()
  public lists: IList[];

  @Output()
  public onListDelete = new EventEmitter();

  public list: IList = null;

  public urlControl = new FormControl('', [Validators.required]);

  public requestState = RequestStateEnum.DEFAULT;
  public RequestStateEnum = RequestStateEnum;

  public links$: Observable<ILink[]>;

  constructor(private linkService: LinkService,
              private listService: ListService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(
        paramMap => {
          this.list = this.lists.find(candidate => candidate.id === +paramMap.get('listId')) || null;

          if (this.list !== null) {
            this.links$ = this.linkService.getAll(this.list);
          }
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
          this.onListDelete.emit();
        }
      );
  }

}
