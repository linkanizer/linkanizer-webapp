import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { IList } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  public lists: IList[] = [];

  constructor(private listService: ListService,
              private router: Router) {
  }

  ngOnInit() {
    this.refreshLists();
  }

  handleListCreated(list: IList): void {
    this.refreshLists();

    this.router.navigate(['/dashboard/', list.id]);
  }

  handleListDelete(): void {
    this.refreshLists();

    this.router.navigate(['/dashboard/']);
  }

  private refreshLists(): void {
    this.listService.getAll().subscribe(lists => this.lists = lists);
  }
}
