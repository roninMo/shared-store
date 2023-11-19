/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService, SubclassedFormBuilder, UserFormFactory, emptyUser, generateUser } from '@shared-store/utilities';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { createMockUserFormFactory } from '../UsersPage/UserForm/TestUtilities';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let store: Store;

  beforeEach(async () => {
    const initialState = { 
      users: { loaded: true, error: null, selectedId: 1 },
    };
    const mockFormFactory: UserFormFactory = createMockUserFormFactory(generateUser(emptyUser)) as unknown as UserFormFactory;

    await TestBed.configureTestingModule({
      imports: [HomePageComponent, HttpClientTestingModule],
      providers: [ApiService, SubclassedFormBuilder, provideMockStore({ initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    component.userFormFactory = mockFormFactory;
    component.userForm = mockFormFactory.subclassedForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
