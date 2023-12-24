import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../models/pagination';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public baseUrl: string = 'http://localhost:5288/users';

  constructor(private http: HttpClient) {}

  public getAllUsersData(
    page?: number,
    itemsPerPage?: number,
    genderToShow?: boolean,
    orderBy?: string
  ): Observable<any> {
    const paginatedResult: PaginatedResult<any> = new PaginatedResult<any>();
    // console.log('a22222222222')
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (genderToShow != null) {
      console.log('gender is not null: ', genderToShow);
      params = params.append('gender', genderToShow);
    }

    if (orderBy != null) {
      console.log('orderBy is not null: ', genderToShow);
      params = params.append('orderBy', orderBy);
    }

    return this.http
      .get(`${this.baseUrl}`, { observe: 'response', params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            const paginationHeader = response.headers.get('Pagination');
            paginatedResult.pagination = paginationHeader
              ? JSON.parse(paginationHeader)
              : null;
          }
          return paginatedResult;
        })
      );
  }

  public getAllUserData(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  public updateUserData(user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/${user?.id}`, user);
  }

  public baseUrlPhoto: string = 'http://localhost:5288/Photos';
  public updateUserPhotos(id: number, File: any): Observable<any> {
    return this.http.post(`${this.baseUrlPhoto}/${id}`, File);
  }

  public baseUrlVideo: string = 'http://localhost:5288/Photos/Videos';
  public updateUserVideos(id: number, File: any): Observable<any> {
    return this.http.post(`${this.baseUrlVideo}/${id}`, File);
  }

  public baseUrlMainPhoto: string = 'http://localhost:5288/Photos/MainPhoto';
  public updateUserMainPhoto(id: number, File: any): Observable<any> {
    console.log('in update main photo');
    return this.http.post(`${this.baseUrlMainPhoto}/${id}`, File);
  }
}
