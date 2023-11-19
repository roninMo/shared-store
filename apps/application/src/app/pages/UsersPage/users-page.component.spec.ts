/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersPageComponent } from './users-page.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { ApiService, SubclassedFormBuilder } from '@shared-store/utilities';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersPageComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;
  let store: Store;
  
  beforeEach(async () => {
    const initialState = { users: { loaded: true, error: null, selectedId: 1 } };

    await TestBed.configureTestingModule({
      imports: [UsersPageComponent, HttpClientTestingModule],
      providers: [SubclassedFormBuilder, ApiService, provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersPageComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
