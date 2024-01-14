import { Component } from '@angular/core';
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
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  isUserSettingsOpened: boolean = false;

  CurrentUser: any = {};

  CurrentUserId: number = 0;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  allMessagesBetween: MessageWithSenderViewModel[] = [];

  selectedMessages: MessageWithSenderViewModel[] = [];

  senderData: User;
  receiverData: User;

  message: string = ''; // will hold what written on the screen

  isAttatchPopUpOpen = false;

  ngOnInit(): void {
    this.InitiateUsersDataAndChat();
    console.log('the reviever is: ', this.allMessagesBetween);

    this.CurrentUserId = this.route.snapshot.params?.['id']; // to get the id from the url itself
  }

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

  InitiateUsersDataAndChat() {
    this.route.data.subscribe((data) => {
      this.senderData = data['inBetweenChatData'].Sender;
      this.receiverData = data['inBetweenChatData'].Receiver;
      this.allMessagesBetween = data['inBetweenChatData'].allMessagesBetween;
    });
  }

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
        this.closeAttached();
      },
      error: () => {
        console.log('errrrrrrrror');
      },
    });
  }

  updateUserData() {
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

  SaveValue = (e: any) => {
    // needed
    this.message = e.target.value;
  };

  ShowMessage = () => {
    // needed
    if (this.message !== '') {
      this.sendTextMessage(); // The new one
      this.message = '';
      this.ScrollDown();
    }
  };
  toggleAttached = () => {
    this.isAttatchPopUpOpen = !this.isAttatchPopUpOpen;
  };

  closeAttached = () => {
    this.isAttatchPopUpOpen = false;
  };

  GetCurrentTime = (date: Date): string[] => {
    const CurrentDate = new Date(date);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const CurrentDayIndex = CurrentDate.getDay(); // will return a the index of the day

    let hours =
      CurrentDate.getHours() > 12
        ? CurrentDate.getHours() - 12
        : CurrentDate.getHours();
    let minutes = CurrentDate.getMinutes().toString();
    let duration = CurrentDate.getHours() > 12 ? 'PM' : 'AM';
    if (minutes.length == 1) minutes = '0' + minutes;
    const timeNow = `${hours}:${minutes} ${duration}`;
    const toReturn: string[] = [timeNow, daysOfWeek[CurrentDayIndex]];

    return toReturn;
  };

  EnterKeyPressed = (e: any) => {
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

  updateTerms(event: any) {
    this.message = event.target.innerText;
  }
}
