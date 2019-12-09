import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IList } from '../models';


@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() {
  }

  public create(list: IList, url: string): Observable<void> {
    list.links.push({
      title: url,
      url,
      id: Date.now()
    });

    return of();
  }

}
