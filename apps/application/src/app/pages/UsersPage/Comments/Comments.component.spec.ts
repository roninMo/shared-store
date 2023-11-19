/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsComponent } from './Comments.component';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let store: Store;

  beforeEach(async () => {
    const initialState = { 
      users: { loaded: true, error: null, selectedId: 1 },
      comments: { loaded: true, error: null },  
    };

    await TestBed.configureTestingModule({
      imports: [CommentsComponent],
      providers: [provideMockStore( { initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
