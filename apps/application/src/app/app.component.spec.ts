/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: Store;

  const initialState = { 
    users: { loaded: true, error: null, selectedId: 1 },
    posts: { loaded: true, error: null },
    comments: { loaded: true, error: null },  
    todos: { loaded: true, error: null },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
    
  });

  it('should render', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });
});
