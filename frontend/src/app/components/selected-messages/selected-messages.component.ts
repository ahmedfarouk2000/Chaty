import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-selected-messages',
  templateUrl: './selected-messages.component.html',
  styleUrls: ['./selected-messages.component.css'],
})
export class SelectedMessagesComponent {
  @Input() selectedMessages: any[];
  @Output() onDiscardSelectedMessages: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() onGetAllMessagesInBetween: EventEmitter<any> =
    new EventEmitter<any>();

  constructor(private messageService: MessageService) {}

  discardSelectedMessages() {
    this.onDiscardSelectedMessages.emit();
  }

  getAllMessagesInBetween() {
    this.onGetAllMessagesInBetween.emit();
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
}
