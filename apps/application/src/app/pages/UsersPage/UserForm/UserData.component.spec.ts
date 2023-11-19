/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDataComponent } from './UserData.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService, SubclassedFormBuilder } from '@shared-store/utilities';
import { Store } from '@ngrx/store';

describe('UserDataComponent', () => {
  let component: UserDataComponent;
  let fixture: ComponentFixture<UserDataComponent>;
  let store: Store;

  beforeEach(async () => {
    const initialState = { 
      users: { loaded: true, error: null, selectedId: 1 },
      posts: { loaded: true, error: null },
      comments: { loaded: true, error: null },  
      todos: { loaded: true, error: null },
    };

    await TestBed.configureTestingModule({
      imports: [UserDataComponent, HttpClientTestingModule],
      providers: [ApiService, SubclassedFormBuilder, provideMockStore( { initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDataComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
