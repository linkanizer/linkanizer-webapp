import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ILink, IList } from '../models';

const LINKS: { [key: string]: ILink[] } = {};

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() {
  }

  public create(list: IList, url: string): Observable<null> {
    if (!Array.isArray(LINKS[list.id])) {
      LINKS[list.id] = [];
    }

    LINKS[list.id].push({
      title: url,
      url,
      id: Date.now()
    });

    return of(null);
  }

  public getAll(list: IList): Observable<ILink[]> {
    return of(LINKS[list.id] || []);
  }

  public delete(link: ILink): Observable<null> {
    for (const key of Object.keys(LINKS)) {
      LINKS[key] = LINKS[key].filter(candidate => candidate.id !== link.id);
    }

    return of(null);
  }

}
