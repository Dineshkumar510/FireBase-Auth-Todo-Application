import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private resultsPerPage = 10;
  private currentPage = 1;

  private apiUrl = 'https://randomuser.me/api';

  //private dataUrl = '../../../assets/data.json';

  constructor(private http: HttpClient) {}


getMoreResults(params: { results: number }): Observable<any> {
  const { results } = params;
  const url = `${this.apiUrl}?results=${results}`;
  //const url = `${this.apiUrl}?page=${this.currentPage}&results=${page}`;
  return this.http.get(url);
}

}
