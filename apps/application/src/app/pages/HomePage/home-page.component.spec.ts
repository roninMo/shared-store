/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService, SubclassedFormBuilder } from '@shared-store/utilities';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { FormBuilder } from '@angular/forms';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let store: Store;

  beforeEach(async () => {
    const initialState = { users: { loaded: true, error: null, selectedId: 1 } };
    
    await TestBed.configureTestingModule({
      imports: [HomePageComponent, HttpClientTestingModule],
      providers: [ApiService, FormBuilder, provideMockStore({ initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
