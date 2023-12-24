import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttatchComponent } from './attatch.component';

describe('AttatchComponent', () => {
  let component: AttatchComponent;
  let fixture: ComponentFixture<AttatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
