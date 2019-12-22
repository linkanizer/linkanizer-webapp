import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IList } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<IList[]> {
    return this.http.get<IList[]>(`${environment.api}/lists/`);
  }

  public get(id: string): Observable<IList> {
    return this.http.get<IList>(`${environment.api}/lists/${id}/`);
  }

  public create(name: string): Observable<IList> {
    const list: Partial<IList> = {
      name
    };

    return this.http.post<IList>(`${environment.api}/lists/`, list);
  }

  public delete(list: IList): Observable<IList> {
    // TODO check API return for delete endpoint
    return this.http.delete<IList>(`${environment.api}/lists/${list.id}/`);
  }
}
