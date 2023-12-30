import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { User } from '../models/user';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['password', Validators.required],
    });
  }

  goToRegister = () => {
    this.router.navigate(['/register']);
  };

  goToAllUsers = () => {
    this.router.navigate(['/users']);
  };

  isWrongPassword = false;

  Login = () => {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data: User) => {
          console.log(data.token);
          localStorage.setItem('token', data.token);
          localStorage.setItem('SenderData', JSON.stringify(data));
          // localStorage.setItem("id", data.id)
          this.router.navigate([`/users`]);
          this.authService.updateSenderUser(data);
          this.updateUserLastTimeActive(data.id);
        },
        error: (data: any) => {
          // here will not return a token :(
          console.log('from error', data);
          this.isWrongPassword = true;
        },
      });
    }
  };

  updateUserLastTimeActive = (userId: number) => {
    this.dataService.updateUserLastTimeActive(userId).subscribe((res) => {
      console.log('last time is updated man: ', res);
    });
  };
}
