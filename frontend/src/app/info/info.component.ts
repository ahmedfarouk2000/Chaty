import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { User } from '../models/user';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent {
  @Output() onClickToOpenEdit: EventEmitter<any> = new EventEmitter<any>();
  @Input() receiverData: User;

  constructor(private router: Router) {}

  ClickToOpenEditTab() {
    this.onClickToOpenEdit.emit();
  }

  backToAllUsers = () => {
    this.router.navigate(['/users']);
  };
}
