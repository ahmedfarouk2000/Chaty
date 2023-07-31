import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { MyDataResolver } from './resolver/dataresolver.service';

const routes: Routes = [
  {
    path: 'users/:id',
    component: ChatInputComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users', // 
    component: AllUsersComponent,
    resolve: { // means this is will be fetched once i route to this page
      users: MyDataResolver,
    },
  },

  {
    path: '**', // 
    component: ErrorComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [MyDataResolver] // Add the MyDataResolver to the providers array

})
export class AppRoutingModule { }
