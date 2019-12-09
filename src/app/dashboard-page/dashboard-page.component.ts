import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { Observable } from 'rxjs';
import { IList } from '../models';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  public lists$: Observable<IList[]>;

  public activeList: IList = null;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.lists$ = this.listService.getAll();
  }

  handleListCreated(list: IList): void {
    this.lists$ = this.listService.getAll();
    this.activeList = list;
  }
}
