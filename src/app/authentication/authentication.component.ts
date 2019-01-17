import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cc-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  jbbData = null;
  isAuthenticated = false;
  welcomeMessage = '';
  jbbToken = null;
  JBB_TOKEN_NAME = 'jbb-token';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    if(this.authService.userIsLoggedIn()) {
      this.refreshFlags();
      this.jbbData = JSON.parse(localStorage.getItem('jbb-data'));
      const jbbToken = JSON.parse(localStorage.getItem(this.JBB_TOKEN_NAME));
      console.log('jbbToken: ', jbbToken);
      this.jbbToken = this.authService.decodeToken(jbbToken.token);
      console.log('jbbToken: ', this.jbbToken);
    }
  }

  refreshFlags(){
    this.isAuthenticated = true;
    this.welcomeMessage = 'Bienvenue';
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
    this.refreshFlags();
    localStorage.setItem('jbbData', JSON.stringify(data));
    this.jbbToken = data;
    localStorage.setItem(this.JBB_TOKEN_NAME, JSON.stringify(data));  
  }

  handleLoginFailure(error){
    console.log('failure', error);
  }


}
