import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl: string = 'http://localhost:5288/auth'
  public UserData = new BehaviorSubject<any>({}); // send all the user data here so i can fetch the username and photo from it
  public currentUserData = this.UserData.asObservable();


  public SelectUserFromUsers = (userData: any) => {
    this.UserData.next(userData);
    console.log('the current user from observalbe is ', this.currentUserData.source)
  }


  constructor(
    private http: HttpClient
  ) { }

  public register(user: any): Observable<any> { // user must be of form {username : "ahmed" , password: "123"}
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  public login(user: any): Observable<any> { // user must be of form {username : "ahmed" , password: "123"}
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  public IsLoggedIn = () => {
    const token = localStorage.getItem('token')
    return !!token;
  }


  public LogOut = () => { //// to logout
    const token = localStorage.removeItem('token')
  }







}
