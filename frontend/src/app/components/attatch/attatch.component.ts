import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'src/app/Services/message.service';
import { Chaty } from 'src/app/models/chaty';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-attatch',
  templateUrl: './attatch.component.html',
  styleUrls: ['./attatch.component.css'],
})
export class AttatchComponent {
  @Input() SenderData: User;
  @Input() ReceiverData: User;
  @Input() isAttatchPopUpOpen: boolean;

  @Output() getAllMessagesInBetween = new EventEmitter<any>();

  constructor(private messageService: MessageService) {}
  ngOnInit() {}

  isUploadingImage: boolean = false;
  isUploadingImageFailed: boolean = false;
  sendImageMessage(input: any) {
    if (input.files && input.files[0]) {
      const file = input.files[0] as File;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.isUploadingImage = true;
        const formData = new FormData();
        formData.append('File', file);

        let chat: Chaty = {
          senderId: this.SenderData?.id,
          receiverId: this.ReceiverData?.id,
        };

        this.messageService
          .sendPhotoMessage(chat, formData, 'image')
          .subscribe({
            next: () => {
              this.isUploadingImage = false;
              this.getAllMessagesInBetween.emit();
            },
            error: () => {
              this.isUploadingImage = false;
              this.toggleUploadImageFailed();
            },
          });
      };

      reader.readAsDataURL(file);
    }
  }

  toggleUploadImageFailed() {
    this.isUploadingImageFailed = true;
    setTimeout(() => {
      this.isUploadingImageFailed = false;
    }, 2500);
  }

  isUploadingVideo: boolean = false;
  isUploadingVideoFailed: boolean = false;
  sendVideoMessage(input: any) {
    if (input.files && input.files[0]) {
      const file = input.files[0] as File;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.isUploadingVideo = true;
        const formData = new FormData();
        formData.append('File', file);

        let chat: Chaty = {
          senderId: this.SenderData?.id,
          receiverId: this.ReceiverData?.id,
        };

        this.messageService
          .sendPhotoMessage(chat, formData, 'video')
          .subscribe({
            next: () => {
              this.isUploadingVideo = false;
              this.getAllMessagesInBetween.emit();
            },
            error: () => {
              this.isUploadingVideo = false;
              this.toggleUploadVideoFailed();
            },
          });
      };

      reader.readAsDataURL(file);
    }
  }

  toggleUploadVideoFailed() {
    this.isUploadingVideoFailed = true;
    setTimeout(() => {
      this.isUploadingVideoFailed = false;
    }, 2500);
  }

  isUploadingSound: boolean = false;
  isUploadingSoundFailed: boolean = false;
  sendSoundMessage(input: any) {
    if (input.files && input.files[0]) {
      const file = input.files[0] as File;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.isUploadingSound = true;
        const formData = new FormData();
        formData.append('File', file);

        let chat: Chaty = {
          senderId: this.SenderData?.id,
          receiverId: this.ReceiverData?.id,
        };

        this.messageService
          .sendPhotoMessage(chat, formData, 'sound')
          .subscribe({
            next: () => {
              this.isUploadingSound = false;
              this.getAllMessagesInBetween.emit();
            },
            error: () => {
              this.isUploadingSound = false;
              this.toggleUploadSoundFailed();
            },
          });
      };

      reader.readAsDataURL(file);
    }
  }

  toggleUploadSoundFailed() {
    this.isUploadingSoundFailed = true;
    setTimeout(() => {
      this.isUploadingSoundFailed = false;
    }, 2500);
  }
}
