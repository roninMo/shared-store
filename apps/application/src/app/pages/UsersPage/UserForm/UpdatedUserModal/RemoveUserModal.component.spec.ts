/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveUserModalComponent } from './RemoveUserModal.component';
import { ElementRef, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}

describe('RemoveUserModalComponent', () => {
  let component: RemoveUserModalComponent;
  let fixture: ComponentFixture<RemoveUserModalComponent>;
  let store: Store;

  beforeEach(async () => {
    const initialState = { users: {loaded: true, errors: null } };

    await TestBed.configureTestingModule({
      imports: [RemoveUserModalComponent],
      providers: [MockElementRef, provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveUserModalComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
