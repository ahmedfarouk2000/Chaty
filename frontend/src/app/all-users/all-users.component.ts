import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Pagination, PaginatedResult } from '../models/pagination';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    // this.getAllUsers();
  }
  public allUsers: any;
  public pagination: Pagination;


  ngOnInit() {
    // Access the resolved data using the data key specified in the route configuration
    this.route.data.subscribe((data) => {
      console.log(data['users'])
      this.allUsers = data['users'].result;
      this.pagination = data['users'].pagination;
    });

  }





  public updateSelectedUserData = (currentUser: any) => {
    this.authService.SelectUserFromUsers(currentUser);
    this.router.navigate(['/login'])
  }




  public GotoPage = (currentPage: any) => {
    if (currentPage == 0) {
      currentPage = 1;
    }
    else if (currentPage > this.pagination.totalPages) {
      currentPage = this.pagination.totalPages
    }
    if (this.pagination.currentPage != currentPage) {
      this.pagination.currentPage = currentPage;
      this.loadUsers();
    }



  }

  public ToggleGender = (toggle: boolean) => {
    if (toggle != this.SelectedGender) {
      this.SelectedGender = toggle;
      this.pagination.currentPage = 1;
      this.loadUsers();
    }
  }


  public ToggleOrderBy = (toggle: string) => {
    if (toggle != this.OrderBy) {
      this.OrderBy = toggle;
      this.pagination.currentPage = 1;
      this.loadUsers();
    }
  }


  public SelectedGender = false; //female by dafault 
  public OrderBy = "active"; //female by dafault 


  public loadUsers() {
    this.dataService.getAllUsersData(this.pagination.currentPage, this.pagination.itemPerPage, this.SelectedGender, this.OrderBy).subscribe({
      next: (data: PaginatedResult<any>) => {
        console.log(data)
        this.allUsers = data.result;
        this.pagination = data.pagination;
      },
      error: (data: any) => {
        console.log('errrrrrrrror')
      }
    })
  }

  public numSequence(n: number): Array<number> {
    return Array(n);
  }

}
