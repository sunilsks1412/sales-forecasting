import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}  

  login() {
    if (this.username === 'sunil@gmail.com' && this.password === 'Test@123') {
      // Navigate to home page
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }
}
