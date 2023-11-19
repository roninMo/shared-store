import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveUserModalComponent } from './RemoveUserModal.component';
import { ElementRef } from '@angular/core';

describe('RemoveUserModalComponent', () => {
  let component: RemoveUserModalComponent;
  let fixture: ComponentFixture<RemoveUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveUserModalComponent],
      providers: [ElementRef],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
