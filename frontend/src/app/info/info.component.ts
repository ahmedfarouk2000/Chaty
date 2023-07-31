import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {

  }

  public CurrentUser: {
    id: number,
    name: string,
    chats: any,
    mainPhoto: any,
    gender: any
  };

  public CurrentUserId: number;

  public isUploadingImage: boolean = false;

  ngOnInit() {
    this.CurrentUserId = this.route.snapshot.params?.['id'] // to get the id from the url itself
    this.getAllUserData();
  }


  public getAllUserData() {
    let id: any = this.route.snapshot.params?.['id'] // to get the id from the url itself
    this.dataService.getAllUserData(id).subscribe({
      next: (data: any) => {
        this.CurrentUser = data;
        console.log('CurrentUser from info', this.CurrentUser)
      },
      error: (data: any) => {
        console.log('errrrrrrrror')
      },
    })
  }

  public LogOut = () => {

    this.authService.LogOut();
    this.router.navigate(['/users'])
  }




  public handleMainImageInput = (input: any) => { //Not wowrking idkkkkkkkk why

    if (input.files && input.files[0]) {
      const file = input.files[0] as File;
      const reader = new FileReader();



      reader.onload = (e: any) => {
        this.isUploadingImage = true;

        const formData = new FormData();
        formData.append('File', file);
        console.log('in progress') // here i must add the loading indicator
        this.dataService.updateUserMainPhoto(this.CurrentUserId, formData).subscribe({
          next: (data: any) => {
            console.log("data in image upload is", data);
            this.CurrentUser.mainPhoto = data;
            this.isUploadingImage = false;
          },
          error: (error: any) => {
            console.log('erorrrrrrrr', error);
            this.isUploadingImage = false;
          }
        })
      };

      reader.readAsDataURL(file);
    }
  };


}
