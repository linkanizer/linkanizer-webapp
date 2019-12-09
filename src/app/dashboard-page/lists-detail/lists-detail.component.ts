import { Component, Input, OnInit } from '@angular/core';
import { IList, RequestStateEnum } from '../../models';
import { FormControl, Validators } from '@angular/forms';
import { LinkService } from '../../services/link.service';

@Component({
  selector: 'app-lists-detail',
  templateUrl: './lists-detail.component.html',
  styleUrls: ['./lists-detail.component.css']
})
export class ListsDetailComponent implements OnInit {

  @Input()
  public activeList: IList = null;

  public urlControl = new FormControl('', [Validators.required]);

  public requestState = RequestStateEnum.DEFAULT;
  public RequestStateEnum = RequestStateEnum;

  constructor(private linkService: LinkService) {
  }

  ngOnInit() {
  }

  addLink(): void {
    this.requestState = RequestStateEnum.LOADING;

    this.linkService.create(this.activeList, this.urlControl.value)
      .subscribe(
        success => {
          this.urlControl.setValue('');

          this.requestState = RequestStateEnum.SUCCESS;
        },
        error => {
          this.requestState = RequestStateEnum.ERROR;
        }
      );
  }

}
