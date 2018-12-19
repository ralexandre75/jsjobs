import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'cc-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  constructor(private _httpClient : HttpClient) { }

  ngOnInit() {
    this._httpClient.get('data/jobs.json').pipe(map(x => console.log(x))).subscribe();
  }

}
