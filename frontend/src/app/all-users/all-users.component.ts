import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Pagination, PaginatedResult } from '../models/pagination';
import { User } from '../models/user';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent {
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  public allUsers: any;
  public pagination: Pagination;

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.allUsers = data['users'].result;
      console.log('all users: ', this.allUsers);
      this.pagination = data['users'].pagination;
    });
  }

  public selectChat = (currentUser: User) => {
    this.authService.updateReceiverUser(currentUser);
    this.router.navigate([`/users/${currentUser?.id}`]);
    localStorage.setItem('ReceiverData', JSON.stringify(currentUser));
  };

  public GotoPage = (currentPage: any) => {
    if (currentPage == 0) {
      currentPage = 1;
    } else if (currentPage > this.pagination.totalPages) {
      currentPage = this.pagination.totalPages;
    }
    if (this.pagination.currentPage != currentPage) {
      this.pagination.currentPage = currentPage;
      this.loadUsers();
    }
  };

  public ToggleGender = (toggle: boolean) => {
    if (toggle != this.SelectedGender) {
      this.SelectedGender = toggle;
      this.pagination.currentPage = 1;
      this.loadUsers();
    }
  };

  public ToggleOrderBy = (toggle: string) => {
    if (toggle != this.OrderBy) {
      this.OrderBy = toggle;
      this.pagination.currentPage = 1;
      this.loadUsers();
    }
  };

  public SelectedGender = false; //female by dafault
  public OrderBy = 'active'; //female by dafault

  public loadUsers() {
    this.dataService
      .getAllUsersData(
        this.getCurrentUser(),
        this.pagination.currentPage,
        this.pagination.itemPerPage,
        this.SelectedGender,
        this.OrderBy
      )
      .subscribe({
        next: (data: PaginatedResult<any>) => {
          console.log(data);
          this.allUsers = data.result;
          this.pagination = data.pagination;
        },
        error: (data: any) => {
          console.log('errrrrrrrror');
        },
      });
  }

  public numSequence(n: number): Array<number> {
    return Array(n);
  }

  get getSenderName() {
    return this.authService.getSenderName();
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
