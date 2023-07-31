import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {

  }
  public currentUserData: any = '';

  public loginForm: FormGroup;

  ngOnInit() {
    this.authService.currentUserData.subscribe(currentUserData => this.currentUserData = currentUserData)
    console.log('current user', this.currentUserData);

    this.loginForm = this.fb.group({
      username: [this.currentUserData.name, [Validators.required]],
      password: ['password', Validators.required],
    });
  }







  public goToRegister = () => {
    this.router.navigate(['/register'])
  }

  public goToAllUsers = () => {
    this.router.navigate(['/users'])
  }


  public isWrongPassword = false;


  public Login = () => {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          console.log(data.token)
          localStorage.setItem("token", data.token)
          localStorage.setItem("username", this.loginForm.value.username)
          // localStorage.setItem("id", data.id)
          this.router.navigate([`/users/${data.id}`])
        },
        error: (data: any) => { // here will not return a token :(
          console.log("from error", data)
          this.isWrongPassword = true;
        }
      })
    }
  }





}
