import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  jobs = [];
  jobsSubject = new Subject();

  constructor(private _httpClient: HttpClient) { }

  getJobs() {
    return this._httpClient.get<any>('data/jobs.json')
      .pipe(tap(x => console.log(x), map(res => res)));
  }

  addJob(jobData){
    jobData.id = Date.now();
    return this.jobsSubject.next(jobData);
  }
}
