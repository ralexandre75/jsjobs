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
  BASE_URL = "http://localhost:4201/";

  constructor(private _httpClient: HttpClient) { }

  getJobs() {
    // On a à la fois des données de jobs.json + des données ajoutées par notre formulaire
    // On a pas encore récupéré de données depuis jobs.json
    //On a des jobs récupéré depuis jobs.json

  /*  return this._httpClient.get<any>('data/jobs.json')
    .pipe(tap(x => console.log(x), 
          map(res => res)
          
          
          )); 

    if(this.jobs.length > 0 && this.initialJobs.length > 0) {
      console.log("case if");
      return  of([...this.jobs, ...this.initialJobs]);
      

    } else if (this.jobs.length > 0 && this.initialJobs.length === 0) {
      console.log("case else if");
      return this._httpClient.get<any>(this.BASE_URL + "api/jobs")
      .pipe( 
            map(res => res),
            tap(data => {this.initialJobs = data; this.jobs = [...this.jobs, ...this.initialJobs]}
          
          
          ));


    } else {}
      console.log("case else");
      return this._httpClient.get<any>(this.BASE_URL + "api/jobs")
      .pipe( 
            map(res => res),
            tap(data => this.initialJobs = data
          
          
          ));

*/

      return this._httpClient.get<any>(this.BASE_URL + "api/jobs")
      .pipe( 
            map(res => res)
            );
    
  }

  addJob(jobData){
    //jobData.id = Date.now();
    //this.jobs = [jobData, ...this.jobs];
    //return this.jobsSubject.next(jobData);

    return this._httpClient .post<any>(this.BASE_URL + "api/jobs", jobData)
                            .pipe(
                                map(res => {
                                  console.log(res);
                                  this.jobsSubject.next(jobData);
                                })
                            );
  }

  getJob(id){
    return this._httpClient.get<any>(this.BASE_URL + `api/jobs/${id}`)
                            .pipe(
                              map(res => res)
                            );
  }

  searchJob(criteria){
    console.log(criteria);
    return this._httpClient.get<any>(`${this.BASE_URL}api/search/${criteria.term}/${criteria.place}`)
                            .pipe(
                              map(res => res)
                            );
  }
}
