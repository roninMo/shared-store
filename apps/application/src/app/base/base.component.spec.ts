/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BaseComponent } from './base.component';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let store: Store;

  beforeEach(async () => {
    const initialState = { 
      comments: { loaded: true, error: null },  
      posts: { loaded: true, error: null },
      todos: { loaded: true, error: null },
      users: { loaded: true, error: null, selectedId: 1 }
    };

    await TestBed.configureTestingModule({
      imports: [BaseComponent, RouterTestingModule],
      providers: [provideMockStore( { initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
