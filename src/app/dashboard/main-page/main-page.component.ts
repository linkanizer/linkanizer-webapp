import { Component, OnInit } from '@angular/core';
import { IList, RequestStateEnum } from '../../models';
import { FormControl, Validators } from '@angular/forms';
import { ListService } from '../../services/list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public lists: IList[] = [];

  public nameControl = new FormControl('', Validators.required);

  public requestState = RequestStateEnum.DEFAULT;
  public RequestStateEnum = RequestStateEnum;

  constructor(private listService: ListService,
              private router: Router) {
  }

  ngOnInit() {
    this.refreshLists();
  }

  public createList(): void {
    this.requestState = RequestStateEnum.LOADING;

    this.listService.create(this.nameControl.value)
      .subscribe(
        list => {
          this.nameControl.setValue('');

          this.requestState = RequestStateEnum.SUCCESS;

          this.refreshLists();

          this.router.navigate(['/dashboard/list/', list.id]);
        },
        error => {
          this.requestState = RequestStateEnum.ERROR;
        }
      );
  }

  private refreshLists(): void {
    this.listService.getAll().subscribe(lists => this.lists = lists);
  }
}
