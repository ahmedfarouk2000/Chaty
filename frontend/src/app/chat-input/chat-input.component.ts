import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService } from '../Services/data.service';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute } from '@angular/router';
// import { FileUploader } from 'ng2-file-upload';




@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent {

  public AllData: any = [];
  // public CurrentUser: { id: number, content: string, date: Date, contentType: string, imagePublicId: string, userId: number, chats: {}[] } = {
  //   id: 1,
  //   content: "",
  //   date: new Date(),
  //   contentType: "",
  //   imagePublicId: "",
  //   userId: 123,
  //   chats: ["Chat 1", "Chat 2", "Chat 3"],
  // }

  public CurrentUser: any = {}

  public CurrentUserId: number = 0;

  // public uploader: FileUploader;
  // public hasBaseDropZoneOver: boolean;
  // public hasAnotherDropZoneOver: boolean;
  // public response: string;


  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {

  }

  // InitialUploader = () => {
  //   this.uploader = new FileUploader({
  //     url: 'http://localhost:5288/Photos/1',
  //     authToken: 'Bearer' + localStorage.getItem('token'),
  //     isHTML5: true,
  //     allowedFileType: ['image'],
  //     removeAfterUpload: false,
  //   });
  // }

  // public fileOverBase(e: any): void {
  //   this.hasBaseDropZoneOver = e;
  // }

  ngOnInit(): void {
    console.log('aaaaaaaaaaa')
    this.getAllUserData();


    this.CurrentUserId = this.route.snapshot.params?.['id'] // to get the id from the url itself
    // this.InitialUploader();


    // setTimeout(() => {
    //   this.updateUserData();
    // }, 10000);
  }

  ngOnDestroy() {
    // Perform any cleanup tasks or unsubscribe from subscriptions here
    // console.log('destoryed')
    // this.updateUserData();
  }

  public updateLastTimeActive = () => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 3);
    this.CurrentUser.lastTimeActive = currentDate.toISOString().slice(0, 19);
    this.updateUserData();
  }



  public getAllUserData() {
    let id: any = this.route.snapshot.params?.['id'] // to get the id from the url itself
    this.dataService.getAllUserData(id).subscribe({
      next: (data: any) => {
        this.CurrentUser = data;
        for (const currentChat of this.CurrentUser.chats) {
          currentChat.isSelected = false;
        }
        this.updateLastTimeActive();

      },
      error: (data: any) => {
        console.log('errrrrrrrror')
      },
      complete: () => {
        this.ScrollDown();
      }


    })
  }


  public updateUserData() {

    console.log('the curresnt user update', this.CurrentUser);

    // if (this.CurrentUser.MainPhoto == null) // temprary 
    //   this.CurrentUser.MainPhoto = {}

    this.dataService.updateUserData(this.CurrentUserId, this.CurrentUser).subscribe({
      next: (data: any) => {
        console.log('worrrrrrked from updateService', data)
      },
      error: (data: any) => {
        console.log('errrrrrrrror from update')
      }

    })
  }





  public message: any = ''; // will hold what written on the screen 
  public allMessages: { id?: number, Content: any, type: string, isSelected: boolean, time: any, ImagePublicId: any }[] = [];
  // public allNewMessages: { text: any, type: string, isSelected: boolean, time: any }[] = [];
  public AllSelectedToDelete: number = 0;

  public isAttatched = false;

  public sound: HTMLAudioElement = new Audio();


  public ChangeCurrentMoment = (e: any, currentTime: any) => {
    currentTime.sound.currentTime = e.target.value
  }




  public playSound = (input: any) => {

    if (!input.isPlaying) {
      input.sound.play();
      input.isPlaying = true;

      input.interval = setInterval(() => {
        this.cdr.detectChanges()
        console.log(input.duration)
        if (input.sound.currentTime == input.duration) { // this means its finished 
          console.log('finisheddddddd')
          clearInterval(input.interval)
          input.isPlaying = false;
        }
      }, 1000)

    }
    else { // means already is playing thus stop it
      input.sound.pause();
      input.isPlaying = false;

      clearInterval(input.interval)
    }

  }

  public ToInteger = (input: number) => {
    let result = Math.trunc(input);
    if (result.toString().length == 1)
      return '0' + result;
    return result;
  }


  handleSoundInput(input: any) {
    const file: File = input.files[0];
    if (file) {
      this.sound = new Audio();
      this.sound.src = URL.createObjectURL(file);
      console.log('Selected sound file:', file.name);

      setTimeout(() => { // this somtimes cause problem for the duration if not loaded thus will reulst NAN
        // this.CurrentUser.chats.push({ Content: { sound: this.sound, isPlaying: false, duration: this.sound.duration, interval: '' }, type: 'sound', isSelected: false, time: new Date(), ImagePublicId: null })
        this.CurrentUser.chats.push({ content: { sound: this.sound, isPlaying: false, duration: this.sound.duration, interval: '', fileName: file.name }, contentType: 'sound', date: new Date(), userId: this.CurrentUserId, ImagePublicId: null })

        this.ScrollDown();
        this.toggleAttached();
      }, 500);


    }
  }

  public SaveValue = (e: any) => {
    this.message = e.target.value;
  }

  public ShowMessage = () => { // used to send the message
    console.log(this.message)
    console.log('kkkkkkkkkk')

    if (this.message !== '') {

      // this.allMessages.push({ Content: this.message, type: 'text', isSelected: false, time: new Date(), ImagePublicId: null }) // those does not has an id yet
      // this.allNewMessages.push({ text: this.message, type: 'text', isSelected: false, time: new Date() })
      this.CurrentUser.chats.push({ content: this.message, contentType: 'text', date: new Date(), userId: this.CurrentUserId, ImagePublicId: null })
      // console.log('this.allMessages insrt', this.allMessages)
      console.log('this.CurrentUser ShowMessage', this.CurrentUser.chats)
      // console.log('the allMessages', this.allMessages)
      // console.log('the CurrentUser', this.CurrentUser.chats)
      this.message = ''
      this.ScrollDown();
      this.updateUserData(); // to be real timeeeeeeeeeeeeeeeeeeeeeeeeeed
    }
  }
  public toggleAttached = () => {
    this.isAttatched = !this.isAttatched;
  }

  public GetCurrentTime = (date: Date): string[] => {
    const CurrentDate = new Date(date);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const CurrentDayIndex = CurrentDate.getDay(); // will return a the index of the day



    let hours = CurrentDate.getHours() > 12 ? CurrentDate.getHours() - 12 : CurrentDate.getHours();
    let minutes = CurrentDate.getMinutes().toString();
    let duration = CurrentDate.getHours() > 12 ? 'PM' : 'AM';
    // let minutesUpdated = ''
    if (minutes.length == 1)
      minutes = '0' + minutes;
    const timeNow = `${hours}:${minutes} ${duration}`;
    const toReturn: string[] = [timeNow, daysOfWeek[CurrentDayIndex]];

    return toReturn;
  }

  public getTime = () => {
    const currentDate = new Date();
    return currentDate
  }


  // public GetCurrentTimeFromAPI = (inputDate: any): string => {
  //   let hours = inputDate.getHours() > 12 ? inputDate.getHours() - 12 : inputDate.getHours();
  //   let minutes = inputDate.getMinutes().toString();
  //   let duration = inputDate.getHours() > 12 ? 'PM' : 'AM';
  //   // let minutesUpdated = ''
  //   if (minutes.length == 1)
  //     minutes = '0' + minutes;
  //   const timeNow = `${hours}:${minutes} ${duration}`;
  //   return timeNow;
  // }

  public EnterKeyPressed = (e: any) => {
    if (e.key == 'Enter') {
      this.ShowMessage()
    }
  }


  public ScrollDown = () => {
    setTimeout(() => {
      var scrollContainer = document.querySelector('.blank');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }

    }, 50);
  }

  public isUploadingImage: boolean = false;
  public isUploadingImageFailed: boolean = false;
  public handleImageInput = (input: any, type: string) => { //Not wowrking idkkkkkkkk why
    // this.toggleAttached();

    if (input.files && input.files[0]) {
      const file = input.files[0] as File;
      const reader = new FileReader();






      reader.onload = (e: any) => {
        this.isUploadingImage = true;

        const formData = new FormData();
        formData.append('File', file);
        console.log('in progress') // here i must add the loading indicator


        if (type == "image") {
          console.log('in image')

          this.dataService.updateUserPhotos(this.CurrentUserId, formData).subscribe({
            next: (data: any) => {
              console.log("data in image upload is", data);
              this.CurrentUser.chats.push({ content: data.content, contentType: 'photo', date: new Date(), userId: this.CurrentUserId, ImagePublicId: data.imagePublicId })
              this.isUploadingImage = false;
            },
            error: (data: any) => {
              console.log('errrrrrrrror in iaamaaaaaaaaage upload')
              this.isUploadingImage = false;
              this.isUploadingImageFailed = true;
              setTimeout(() => { // will display an image thay it failed 
                this.isUploadingImageFailed = false;
              }, 2500);
            },
            complete: () => {
              console.log('image is uploaded'); // make sure that its done
              this.ScrollDown();

            }
          })


          this.ScrollDown();
          this.toggleAttached();
        }


        else {

          console.log('in video')


          this.dataService.updateUserVideos(this.CurrentUserId, formData).subscribe({
            next: (data: any) => {
              console.log("data in image upload is", data);
              this.CurrentUser.chats.push({ content: data.content, contentType: 'video', date: new Date(), userId: this.CurrentUserId, ImagePublicId: data.imagePublicId })
              this.isUploadingImage = false;
            },
            error: (data: any) => {
              console.log('errrrrrrrror in iaamaaaaaaaaage upload')
              this.isUploadingImage = false;
              this.isUploadingImageFailed = true;
              setTimeout(() => { // will display an image thay it failed 
                this.isUploadingImageFailed = false;
              }, 2500);
            },
            complete: () => {
              console.log('image is uploaded'); // make sure that its done
              this.ScrollDown();

            }
          })


          this.ScrollDown();
          this.toggleAttached();


        }

      }



      reader.readAsDataURL(file);
    }
  };






  public DeleteMessage = (item: any): void => {
    item.isSelected = !item.isSelected // passed by reference 
  }

  public RemoveSelected = () => {
    // const idsToRemove: number[] = [];
    // const objectToRemove: any[] = [];



    let NewMessages = this.CurrentUser.chats.filter((message: any) => {
      return !message.isSelected
    })


    this.CurrentUser.chats = [...NewMessages]
    this.updateUserData(); // to be real timeeeeeeeeeeeeeeeeeeeeeeeeeed


    // console.log('ids to remove are ', objectToRemove)

    // this.CurrentUser.filter((message:any) => {
    //   return message.isSelected
    // })

    // const CurrentUser: any = this.CurrentUser.chats.filter((message: any) => {
    //   return !idsToRemove.includes(message.id)
    // }
    // )
    // this.CurrentUser.chats = [...CurrentUser]
    // console.log('After removeing', CurrentUser)
    // console.log('After removeing', SelectOnes);


    let SelectOnes = this.CurrentUser.chats.filter((message: any) => {
      return message.isSelected
    })
    console.log("the Selected One", SelectOnes)

    for (const currentMessage of SelectOnes) { // not working so far idk whyyyyyyyyyyyyyyy
      if (currentMessage.type == 'sound') { // must first stop them
        console.log('heeeeeeeeeeeeeeeey stop the sound plz')
        this.playSound(currentMessage.content); // used to stop them if they were running and u deleted them
      }
    }


  }

  public DiscardSelected = () => {
    for (const currentMessage of this.CurrentUser.chats) {
      currentMessage.isSelected = false;
    }

  }

  public CountSelectedToDelete = () => {
    try {
      let count = this.CurrentUser.chats.filter((message: any) => message.isSelected).length
      this.AllSelectedToDelete = count;
      return count > 0
    }
    catch (error) {
      return 0;
    }

  }





}
