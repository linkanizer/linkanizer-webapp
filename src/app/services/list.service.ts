import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IList } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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

  public move(list: IList, order: number): Observable<any> {
    const payload = {
      order
    };

    return this.http.post(`${environment.api}/lists/${list.id}/move/`, payload);
  }

  public delete(list: IList): Observable<IList> {
    return this.http.delete<IList>(`${environment.api}/lists/${list.id}/`);
  }
}
