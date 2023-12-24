import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../Services/data.service';
import { AuthService } from '../Services/auth.service';
import { User } from '../models/user';

@Injectable()
export class MyDataResolver implements Resolve<any> {
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  public pageNumber = 1;
  public pageSize = 5;
  public genderToShow = false; // will show males only first
  public orderBy = 'active'; // will show males only first

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaa');

    return this.dataService.getAllUsersData(
      this.getCurrentUser(),
      this.pageNumber,
      this.pageSize,
      this.genderToShow,
      this.orderBy
    );
  }

  getCurrentUser(): number {
    if (!this.authService.getSenderData()) {
      let storedUserJsonString = localStorage.getItem('SenderData');
      let storedUser: User = JSON.parse(storedUserJsonString);
      return storedUser?.id;
    } else {
      return this.authService.getSenderId();
    }
  }
}
