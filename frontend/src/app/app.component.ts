import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chat';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domainSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'arrowLeft',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/arrowLeft.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'exit',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/exit.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'trash',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/trash.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'attatch',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/attatch.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'arrowRight',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/arrowRight.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'image',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/image.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'sound',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/sound.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'pause',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/pause.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'play',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/play.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'user',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/user.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'password',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/password.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'video',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/video.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'editMainPhoto',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/editMainPhoto.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'birthday',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/birthday.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'gender',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/gender.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'chat',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/chat.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'cake',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/cake.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'gender-male',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/gender-male.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'gender-female',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/gender-female.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'arrow-button-left',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/arrow-button-left.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'arrowLeftDouble',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/arrowLeftDouble.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'birthday2',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/birthday2.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'baby',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/baby.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'cancel',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/cancel.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'image-upload',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/image-upload.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'film',
      this.domainSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/film.svg'
      )
    );
  }
}
