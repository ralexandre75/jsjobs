import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'cc-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  jbbData = null;
  isAuthenticated = false;
  welcomeMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(formData) {
    this.authService.login(formData)
                    .subscribe(
                      data => this.handleLoginSuccess(data),
                      error => this.handleLoginFailure(error)
                    )
  }

  handleLoginSuccess(data){
    console.log('success', data);
    this.jbbData = data;
    this.isAuthenticated = true;
    this.welcomeMessage = 'Bienvenue';
    localStorage.setItem('jbbData', JSON.stringify(data));
  }

  handleLoginFailure(error){
    console.log('failure', error);
  }


}
