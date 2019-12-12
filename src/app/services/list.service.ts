import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IList } from '../models';

let LISTS: IList[] = [];

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() {
  }

  public getAll(): Observable<IList[]> {
    return of(LISTS);
  }

  public create(name: string): Observable<IList> {
    const list: IList = {
      id: Date.now(),
      name
    };

    LISTS.push(list);

    return of(list);
  }

  public delete(list: IList): Observable<null> {
    LISTS = LISTS.filter(candidate => candidate.id !== list.id);

    return of(null);
  }
}
