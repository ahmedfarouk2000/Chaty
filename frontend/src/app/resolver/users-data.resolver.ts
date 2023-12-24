import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { SenderAndReceiver } from '../models/SenderAndReceiver';
import { MessageService } from '../Services/message.service';
import { MessageDto } from '../models/messageDto';
import { MessageWithSenderViewModel } from '../models/MessageWithSenderViewModel';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersDataResolver {
  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  resolve(): Observable<SenderAndReceiver> {
    return of({}).pipe(
      switchMap(() => {
        this.ScrollDown();

        let SenderAndReceiver: SenderAndReceiver = {};

        if (!this.authService.getSenderData()) {
          let storedUserJsonString = localStorage.getItem('SenderData');
          let storedUser = JSON.parse(storedUserJsonString);
          SenderAndReceiver.Sender = storedUser;
        } else {
          SenderAndReceiver.Sender = this.authService.getSenderData();
        }

        if (!this.authService.getReceiverData()) {
          let storedUserJsonString = localStorage.getItem('ReceiverData');
          let storedUser = JSON.parse(storedUserJsonString);
          SenderAndReceiver.Receiver = storedUser;
        } else {
          SenderAndReceiver.Receiver = this.authService.getReceiverData();
        }

        let chatBetween: MessageDto = {
          SenderId: SenderAndReceiver.Sender?.id,
          ReceiverId: SenderAndReceiver.Receiver?.id,
        };

        return this.messageService.getAllMessagesInBetween(chatBetween).pipe(
          switchMap((data: MessageWithSenderViewModel[]) => {
            SenderAndReceiver.allMessagesBetween = data;
            return of(SenderAndReceiver);
          })
        );
      })
    );
  }

  ScrollDown = () => {
    setTimeout(() => {
      var scrollContainer = document.querySelector('.blank');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 50);
  };
}
