import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chaty } from '../models/chaty';
import { Message } from '../models/Message';

import { Observable } from 'rxjs';
import { MessageDto } from '../models/messageDto';
import { MessageWithSenderViewModel } from '../models/MessageWithSenderViewModel';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public baseUrl: string = 'http://localhost:5288/messages';

  constructor(private http: HttpClient) {}

  sendMessage(chat: Chaty): Observable<Chaty> {
    return this.http.post<Chaty>(`${this.baseUrl}`, chat);
  }

  sendPhotoMessage(
    chat: Chaty,
    file: FormData,
    contentType: string
  ): Observable<Chaty> {
    console.log('chat: ', chat);
    console.log('contentType: ', contentType);
    return this.http.post<Chaty>(
      `${this.baseUrl}/Image?SenderId=${chat?.senderId}&ReceiverId=${chat?.receiverId}&ContentType=${contentType}`,
      file
    );
  }

  sendVideoMessage(chat: Chaty, file: FormData): Observable<Chaty> {
    return this.http.post<Chaty>(
      `${this.baseUrl}/Video?SenderId=${chat?.senderId}&ReceiverId=${chat?.receiverId}`,
      file
    );
  }

  getAllMessagesInBetween(
    senderAndReceiver: MessageDto
  ): Observable<MessageWithSenderViewModel[]> {
    return this.http.post<MessageWithSenderViewModel[]>(
      `${this.baseUrl}/allMessages`,
      senderAndReceiver
    );
  }

  deleteSelectedMessages(
    selectedMessages: MessageWithSenderViewModel[]
  ): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/deleteMessages`,
      selectedMessages
    );
  }
}
