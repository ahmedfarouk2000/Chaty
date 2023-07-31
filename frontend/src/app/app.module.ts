import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { InfoComponent } from './info/info.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './Services/interceptor/auth-token.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { ErrorComponent } from './error/error.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
// import { FileUploadModule } from 'ng2-file-upload'
// import { TimeAgoPipe } from 'time-ago-pipe';
// import { TimeagoPipe } from 'ngx-timeago'; // Import from 'ngx-timeago'




@NgModule({
  declarations: [
    AppComponent,
    ChatInputComponent,
    InfoComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    AllUsersComponent,
    DateAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,

    // FileUploadModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
