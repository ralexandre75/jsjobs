import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {


  constructor(private _httpClient: HttpClient) { }

  getJobs() {
    return this._httpClient.get<any>('data/jobs.json')
      .pipe(tap(x => console.log(x), map(res => res)));
  }
}
