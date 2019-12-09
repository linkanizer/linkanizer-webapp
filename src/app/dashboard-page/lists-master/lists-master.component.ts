import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListService } from '../../services/list.service';
import { IList, RequestStateEnum } from '../../models';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lists-master',
  templateUrl: './lists-master.component.html',
  styleUrls: ['./lists-master.component.css']
})
export class ListsMasterComponent implements OnInit {

  @Input()
  public lists: IList[];

  @Input()
  public activeList: IList;

  @Output()
  public activeListChange = new EventEmitter();

  @Output()
  public listCreated = new EventEmitter();

  public nameControl = new FormControl('', Validators.required);

  public requestState = RequestStateEnum.DEFAULT;
  public RequestStateEnum = RequestStateEnum;

  constructor(private listService: ListService) {
  }

  ngOnInit() {

  }

  public selectList(list: IList): void {
    this.activeListChange.emit(list);
  }

  public createList(): void {
    this.requestState = RequestStateEnum.LOADING;

    this.listService.create(this.nameControl.value)
      .subscribe(
        success => {
          this.listCreated.emit(success);

          this.nameControl.setValue('');

          this.requestState = RequestStateEnum.SUCCESS;
        },
        error => {
          this.requestState = RequestStateEnum.ERROR;
        }
      );
  }
}
