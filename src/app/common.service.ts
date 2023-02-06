import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private client: HttpClient) {}

  getTechnologyList(): Observable<any> {
    return this.client
      .get('http://localhost:8080/hr/list-technology')
      .pipe(map((response) => response));
  }
}
