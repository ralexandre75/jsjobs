import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobService } from '../services/job.service';

@Component({
  selector: 'cc-job-add-form',
  templateUrl: './job-add-form.component.html',
  styleUrls: ['./job-add-form.component.css']
})
export class JobAddFormComponent implements OnInit {

  form: FormGroup;

  contractTypes = [
    {id:1, name: "stage", value: "internship" }, 
    {id:2, name: "interim", value: "temp"}, 
    {id:3, name: "contrat à durée déterminée (CDD)", value: "fixed-term"}, 
    {id:4, name: "contrat à durée déterminée (CDI)", value: "permanant"}, 
    {id:5, name: "indépendant", value: "freelance"}
  ];

  currencies = [
    {id:1, name:"euros", value:"EU", symbol:"€"}, 
    {id:2, name:"livre sterling", value:'POUNDS', symbol:"£"},
    {id:3, name:"franc CFA", value:"CFA", symbol:"CFA"}, 
    {id:4, name:"dollars", value:"CAD", symbol:"$"}
  ];
  
  statuses = [
    {id:1, name:"cadre", value:"executive"}, 
    {id:2, name:"employée", value:"employee"}
  ];

  experiences = [
    {id:1, name:"junior", value:"junior"}, 
    {id:2, name:"medior", value:"medior"},
    {id:3, name:"senior", value:"senior"}
  ];

  areas = [
    {id:1, name:"aucun déplacement", value:"none"}, 
    {id:2, name:"déplacement régionaux", value:"region"},
    {id:3, name:"déplacement nationaux", value:"nation"},
    {id:4, name:"déplacement internationaux", value:"international"}
  ];

  constructor(private formBuilder: FormBuilder, private jobService: JobService ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: -1,
      title: '',
      company: '',
      city: '',
      zipcode: 35,
      description: '',
      contract: '',
      salary: null,
      currency: '',
      startdate: new Date(),
      experience: '',
      status: '',
      area: '',
      field: '',
      publishdate: new Date(),
      lastupdate: new Date()
    })
  }

  createJob(jobData) {
    console.log(this.form.value);
    this.jobService.addJob(jobData).subscribe();
    this.form.reset();
  }

}