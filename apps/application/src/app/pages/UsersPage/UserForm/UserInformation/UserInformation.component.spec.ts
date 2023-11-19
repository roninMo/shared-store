import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInformationComponent } from './UserInformation.component';
import { ChangeDetectorRef } from '@angular/core';

describe('UserInformationComponent', () => {
  let component: UserInformationComponent;
  let fixture: ComponentFixture<UserInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInformationComponent],
      providers: [ChangeDetectorRef]
    }).compileComponents();

    fixture = TestBed.createComponent(UserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
