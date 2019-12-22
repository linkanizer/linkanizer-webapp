import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILink, IList } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private http: HttpClient) {
  }

  public create(list: IList, url: string): Observable<ILink> {
    const link: Partial<ILink> & { list: string } = {
      title: url,
      url,
      list: list.id
    };

    return this.http.post<ILink>(`${environment.api}/links/`, link);
  }

  public getAll(list: IList): Observable<ILink[]> {
    const params = {
      list: list.id
    };

    return this.http.get<ILink[]>(`${environment.api}/links/`, { params });
  }

  public delete(link: ILink): Observable<null> {
    return this.http.delete(`${environment.api}/links/${link.id}/`)
      .pipe(
        map(
          () => null
        )
      );
  }

}
