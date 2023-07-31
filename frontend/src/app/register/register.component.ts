import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {

  }


  registerForm: FormGroup = this.fb.group({
    username: ['ahmed', [Validators.required]],
    password: ['password', Validators.required],
    passwordConfirm: ['password', Validators.required],
    dateOfBirth: ['', Validators.required],
  });

  public goToLogin = () => {
    this.router.navigate(['/login'])
  }


  public ResetFlagsUserName = () => {

  }


  public AllErrors: any = {}
  public isMatchedPassword = true;
  public isUsedUser = false;

  public Register = () => {
    if (this.registerForm.valid) {

      if (this.registerForm.value.password == this.registerForm.value.passwordConfirm) { // are matched
        console.log('match')



        let userRegister = {
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
          dateOfBirth: new Date(this.registerForm.value.dateOfBirth),
          gender: this.currentGender,
        }
        console.log('current user', userRegister)

        this.authService.register(userRegister).subscribe({
          next: (data: any) => { // nothing will be sent here thus i know that i successed
            this.goToLogin();
          },
          error: (data: any) => {

            this.AllErrors = { ...data.error.errors }
            console.log("from error", this.AllErrors)

            if (Object.keys(this.AllErrors).length === 0) {
              this.isUsedUser = true;
            }

          }
        })
      }

      else { // password are not matched
        console.log('not maaaaaaaaaatches')
        this.isMatchedPassword = false;

      }
    }




  }

  public currentGender = true;
  public SelectedGender = (gender: boolean) => {
    if (gender)
      this.currentGender = true;
    else
      this.currentGender = false;
  }




}
