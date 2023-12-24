import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMessagesComponent } from './selected-messages.component';

describe('SelectedMessagesComponent', () => {
  let component: SelectedMessagesComponent;
  let fixture: ComponentFixture<SelectedMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
