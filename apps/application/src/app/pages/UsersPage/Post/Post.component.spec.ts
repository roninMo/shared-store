/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './Post.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let store: Store;

  beforeEach(async () => {
    const initialState = { users: { loaded: true, error: null, selectedId: 1 } };

    await TestBed.configureTestingModule({
      imports: [PostComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
