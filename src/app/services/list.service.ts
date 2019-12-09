import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IList } from '../models';

const LISTS: IList[] = [
  {
    id: 1,
    name: 'Astronomy',
    links: []
  },
  {
    id: 2,
    name: 'Physics',
    links: []
  }
];

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
      name,
      links: []
    };

    LISTS.push(list);

    return of(list);
  }
}
