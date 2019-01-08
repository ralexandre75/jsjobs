import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  initialJobs = [];
  jobs = [];
  jobsSubject = new Subject();

  constructor(private _httpClient: HttpClient) { }

  getJobs() {
    // On a à la fois des données de jobs.json + des données ajoutées par notre formulaire
    // On a pas encore récupéré de données depuis jobs.json
    //On a des jobs récupéré depuis jobs.json

  /*  return this._httpClient.get<any>('data/jobs.json')
    .pipe(tap(x => console.log(x), 
          map(res => res)
          
          
          ));*/ 

    if(this.jobs.length > 0 && this.initialJobs.length > 0) {
      console.log("case if");
      return  of([...this.jobs, ...this.initialJobs]);
      

    } else if (this.jobs.length > 0 && this.initialJobs.length === 0) {
      console.log("case else if");
      return this._httpClient.get<any>('data/jobs.json')
      .pipe( 
            map(res => res),
            tap(data => {this.initialJobs = data; this.jobs = [...this.jobs, ...this.initialJobs]}
          
          
          ));


    } else {}
      console.log("case else");
      return this._httpClient.get<any>('data/jobs.json')
      .pipe( 
            map(res => res),
            tap(data => this.initialJobs = data
          
          
          ));


    
  }

  addJob(jobData){
    jobData.id = Date.now();
    this.jobs = [jobData, ...this.jobs];
    return this.jobsSubject.next(jobData);
  }
}
