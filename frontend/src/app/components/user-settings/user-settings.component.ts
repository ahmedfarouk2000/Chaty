import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { DataService } from 'src/app/Services/data.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent {
  @Input() UserData: User;
  @Input() isUserSettingsOpened: boolean;
  @Output() onClickToCloseEdit: EventEmitter<any> = new EventEmitter<any>();
  // must also know who that data to update thus I can know to replace its data in the localstorage
  ClickToCloseEditTab() {
    this.UserDataToBeUpdated = { ...this.UserData };
    this.onClickToCloseEdit.emit();
  }

  isUploadingProfilePhoto: boolean = false;

  UserDataToBeUpdated: User = {
    name: '',
    gender: false,
    dateOfBirth: new Date(),
    dateOfCreation: new Date(),
    lastTimeActive: new Date(),
    mainPhoto: null,
  };

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    console.log('the data in settings: ', this.UserData);

    this.UserDataToBeUpdated = { ...this.UserData };
  }

  handleMainPhotoInput = (input: any) => {
    // not working as well
    if (input.files && input.files[0]) {
      const file = input.files[0] as File;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.isUploadingProfilePhoto = true;
        const formData = new FormData();
        formData.append('File', file);
        this.dataService
          .updateUserMainPhoto(this.UserData?.id, formData)
          .subscribe({
            next: (data: any) => {
              console.log('the data from upload is: ', data);
              this.UserDataToBeUpdated.mainPhoto = data;
              // this.isUploadingProfilePhoto = false;
              this.UserData.mainPhoto = data;
              this.authService.updateReceiverUser(this.UserData);
              localStorage.setItem(
                'ReceiverData',
                JSON.stringify(this.UserData)
              );
              this.UserDataToBeUpdated = { ...this.UserData };
            },
            error: (error: any) => {
              console.log('erorrrrrrrr', error);
              this.isUploadingProfilePhoto = false;
            },
            complete: () => {
              this.isUploadingProfilePhoto = false;
            },
          });
      };

      reader.readAsDataURL(file);
    }
  };

  ChangeGender = (gender: boolean) => {
    this.UserDataToBeUpdated.gender = gender;
  };

  ChangeBirthday = (input: any) => {
    this.UserDataToBeUpdated.dateOfBirth = new Date(input.value);
  };

  removeMainPhoto = () => {
    this.isUploadingProfilePhoto = true;
    this.dataService.removeUserMainPhoto(this.UserData?.id).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          console.log('on remove user photo: ', data);
          this.UserDataToBeUpdated.mainPhoto = null;
          // this.isUploadingProfilePhoto = false;
          this.UserData.mainPhoto = null;
          this.authService.updateReceiverUser(this.UserData);
          localStorage.setItem('ReceiverData', JSON.stringify(this.UserData));
          this.UserDataToBeUpdated = { ...this.UserData };
        }, 2000);
      },
      error: () => {
        setTimeout(() => {
          this.isUploadingProfilePhoto = false;
        }, 2000);
      },
      complete: () => {
        setTimeout(() => {
          this.isUploadingProfilePhoto = false;
        }, 2000);
      },
    });
    // this.UserDataToBeUpdated.mainPhoto = null;
  };

  updateUserData() {
    this.dataService.updateUserData(this.UserDataToBeUpdated).subscribe({
      next: (data: User) => {
        console.log('the data returned after the removal is: ', data);
        this.UserData = data;
        this.authService.updateReceiverUser(data);
        localStorage.setItem('ReceiverData', JSON.stringify(data));
        this.UserDataToBeUpdated = { ...data };
        this.ClickToCloseEditTab();
      },
      error: () => {
        console.log('errrrrrrrror from update');
      },
    });
  }
}
