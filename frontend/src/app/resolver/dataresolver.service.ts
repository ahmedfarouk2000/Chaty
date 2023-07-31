import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../Services/data.service';


@Injectable()
export class MyDataResolver implements Resolve<any> {
  constructor(private dataService: DataService) { }


  public pageNumber = 1;
  public pageSize = 5;
  public genderToShow = false; // will show males only first

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaa');

    return this.dataService.getAllUsersData(this.pageNumber, this.pageSize, this.genderToShow);
  }
}