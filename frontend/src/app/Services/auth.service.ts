import { Injectable, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:5288/auth';

  SenderData = new BehaviorSubject<any>({}); // the sender

  senderUser: User;
  receiverUser: User;
  @Input() SenderUser = new EventEmitter<User>(); // New
  @Input() ReceiverUser = new EventEmitter<User>(); // New

  updateSenderUser(user: User) {
    this.senderUser = user;
    this.SenderUser.emit(user);
  }

  updateReceiverUser(user: User) {
    this.receiverUser = user;
    this.ReceiverUser.emit(user);
  }

  // SelectChatReceiver = (userData: any) => {
  //   this.ReceiverData.next(userData);
  // };

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  IsLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  LogOut = () => {
    const token = localStorage.removeItem('token');
    const senderData = localStorage.removeItem('SenderData');
    const receiverData = localStorage.removeItem('ReceiverData');
  };

  getCurrentLoggedUser(): string | undefined {
    return localStorage.getItem('username')?.toString();
  }

  // Sender

  getSenderData(): User {
    return this.senderUser;
  }

  getSenderId(): number {
    return this.senderUser?.id;
  }

  getSenderName(): string {
    return this.senderUser?.name;
  }

  getSenderGender(): boolean {
    return this.senderUser?.gender;
  }

  getSenderDateOfBirth(): Date {
    return this.senderUser?.dateOfBirth;
  }

  getSenderDataOfCreation(): Date {
    return this.senderUser?.dateOfCreation;
  }

  getSenderLastTimeActive(): Date {
    return this.senderUser?.lastTimeActive;
  }

  getSenderToken(): string {
    return this.senderUser?.token;
  }

  // for the receiver

  getReceiverData(): User {
    return this.receiverUser;
  }

  getReceiverId(): number {
    return this.receiverUser?.id;
  }

  getReceiverName(): string {
    return this.receiverUser?.name;
  }

  getReceiverGender(): boolean {
    return this.receiverUser?.gender;
  }

  getReceiverDateOfBirth(): Date {
    return this.receiverUser?.dateOfBirth;
  }

  getReceiverDataOfCreation(): Date {
    return this.receiverUser?.dateOfCreation;
  }

  getReceiverLastTimeActive(): Date {
    return this.receiverUser?.lastTimeActive;
  }

  getReceiverToken(): string {
    return this.receiverUser?.token;
  }
}
