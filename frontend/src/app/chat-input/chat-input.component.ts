import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService } from '../Services/data.service';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../Services/message.service';
import { Message } from '../models/Message';
import { Chaty } from '../models/chaty';
import { MessageDto } from '../models/messageDto';
import { MessageWithSenderViewModel } from '../models/MessageWithSenderViewModel';
import { User } from '../models/user';
// import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css'],
})
export class ChatInputComponent {
  isUserSettingsOpened: boolean = false;

  public CurrentUser: any = {};

  public CurrentUserId: number = 0;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  allMessagesBetween: MessageWithSenderViewModel[] = [];

  selectedMessages: MessageWithSenderViewModel[] = [];

  senderData: User;
  receiverData: User;

  toggleSelectionMessage(item: MessageWithSenderViewModel) {
    if (item.messageSenderId == this.senderData?.id) {
      if (this.selectedMessages.includes(item)) {
        this.selectedMessages = this.selectedMessages.filter(
          (current) => current.id != item.id
        );
      } else {
        this.selectedMessages.push(item);
      }
    }
    console.log('selected are: ', this.selectedMessages);
  }

  isMessageSelected(item: MessageWithSenderViewModel): boolean {
    return this.selectedMessages.includes(item);
  }

  discardSelectedMessages() {
    this.selectedMessages = [];
  }

  deleteSelectedMessages() {
    this.messageService
      .deleteSelectedMessages(this.selectedMessages)
      .subscribe({
        next: () => {
          console.log('messages are deleted');
        },
        error: (data: any) => {
          console.log('errrrrrrrror : ', data);
        },
        complete: () => {
          this.discardSelectedMessages();
          this.getAllMessagesInBetween();
        },
      });
  }

  ngOnInit(): void {
    this.InitiateUsersDataAndChat();
    console.log('the reviever is: ', this.receiverData);

    this.CurrentUserId = this.route.snapshot.params?.['id']; // to get the id from the url itself
  }
  InitiateUsersDataAndChat() {
    this.route.data.subscribe((data) => {
      this.senderData = data['inBetweenChatData'].Sender;
      this.receiverData = data['inBetweenChatData'].Receiver;
      this.allMessagesBetween = data['inBetweenChatData'].allMessagesBetween;
    });
  }

  // public updateLastTimeActive = () => {
  //   const currentDate = new Date();
  //   currentDate.setHours(currentDate.getHours() + 3);
  //   this.CurrentUser.lastTimeActive = currentDate.toISOString().slice(0, 19);
  //   this.updateUserData();
  // };

  getAllMessagesInBetween() {
    // NEW
    let senderAndReceiver: MessageDto = {
      SenderId: this.senderData?.id,
      ReceiverId: this.receiverData?.id,
    };

    this.messageService.getAllMessagesInBetween(senderAndReceiver).subscribe({
      next: (data: MessageWithSenderViewModel[]) => {
        this.allMessagesBetween = data;
        this.ScrollDown();
      },
      error: () => {
        console.log('errrrrrrrror');
      },
    });
  }

  public updateUserData() {
    // maybe
    console.log('the curresnt user update', this.CurrentUser);

    // if (this.CurrentUser.MainPhoto == null) // temprary
    //   this.CurrentUser.MainPhoto = {}

    this.dataService.updateUserData(this.CurrentUser).subscribe({
      next: (data: any) => {
        console.log('worrrrrrked from updateService', data);
      },
      error: (data: any) => {
        console.log('errrrrrrrror from update');
      },
    });
  }

  sendTextMessage() {
    // needed
    let msg: Message = {
      content: this.message,
      contentType: 'text',
    };

    let chat: Chaty = {
      senderId: this.senderData?.id,
      receiverId: this.receiverData?.id,
      message: msg,
    };

    this.messageService.sendMessage(chat).subscribe({
      next: () => {
        this.getAllMessagesInBetween();
      },
      error: () => {
        console.log('errrrrrrrror from sendMessage');
      },
    });
  }

  public message: string = ''; // will hold what written on the screen

  public isAttatchPopUpOpen = false;

  public sound: HTMLAudioElement = new Audio();

  public ChangeCurrentMoment = (e: any, currentTime: any) => {
    // sound
    currentTime.sound.currentTime = e.target.value;
  };

  public playSound = (input: any) => {
    // sound
    if (!input.isPlaying) {
      input.sound.play();
      input.isPlaying = true;

      input.interval = setInterval(() => {
        this.cdr.detectChanges();
        console.log(input.duration);
        if (input.sound.currentTime == input.duration) {
          // this means its finished
          console.log('finisheddddddd');
          clearInterval(input.interval);
          input.isPlaying = false;
        }
      }, 1000);
    } else {
      // means already is playing thus stop it
      input.sound.pause();
      input.isPlaying = false;

      clearInterval(input.interval);
    }
  };

  public ToInteger = (input: number) => {
    // sound
    let result = Math.trunc(input);
    if (result.toString().length == 1) return '0' + result;
    return result;
  };

  handleSoundInput(input: any) {
    // sound
    const file: File = input.files[0];
    if (file) {
      this.sound = new Audio();
      this.sound.src = URL.createObjectURL(file);
      console.log('Selected sound file:', file.name);

      setTimeout(() => {
        // this somtimes cause problem for the duration if not loaded thus will reulst NAN
        // this.CurrentUser.chats.push({ Content: { sound: this.sound, isPlaying: false, duration: this.sound.duration, interval: '' }, type: 'sound', isSelected: false, time: new Date(), ImagePublicId: null })
        this.CurrentUser.chats.push({
          content: {
            sound: this.sound,
            isPlaying: false,
            duration: this.sound.duration,
            interval: '',
            fileName: file.name,
          },
          contentType: 'sound',
          date: new Date(),
          userId: this.CurrentUserId,
          ImagePublicId: null,
        });

        this.ScrollDown();
        this.toggleAttached();
      }, 500);
    }
  }

  public SaveValue = (e: any) => {
    // needed
    this.message = e.target.value;
  };

  public ShowMessage = () => {
    // needed
    if (this.message !== '') {
      this.sendTextMessage(); // The new one
      this.message = '';
      this.ScrollDown();
    }
  };
  public toggleAttached = () => {
    // image
    this.isAttatchPopUpOpen = !this.isAttatchPopUpOpen;
  };

  public GetCurrentTime = (date: Date): string[] => {
    const CurrentDate = new Date(date);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const CurrentDayIndex = CurrentDate.getDay(); // will return a the index of the day

    let hours =
      CurrentDate.getHours() > 12
        ? CurrentDate.getHours() - 12
        : CurrentDate.getHours();
    let minutes = CurrentDate.getMinutes().toString();
    let duration = CurrentDate.getHours() > 12 ? 'PM' : 'AM';
    // let minutesUpdated = ''
    if (minutes.length == 1) minutes = '0' + minutes;
    const timeNow = `${hours}:${minutes} ${duration}`;
    const toReturn: string[] = [timeNow, daysOfWeek[CurrentDayIndex]];

    return toReturn;
  };

  public EnterKeyPressed = (e: any) => {
    // needed
    if (e.key == 'Enter') {
      this.ShowMessage();
    }
  };

  ScrollDown = () => {
    setTimeout(() => {
      var scrollContainer = document.querySelector('.blank');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 50);
  };

  ClickToToggleEdit = () => {
    this.isUserSettingsOpened = !this.isUserSettingsOpened;
  };
}
