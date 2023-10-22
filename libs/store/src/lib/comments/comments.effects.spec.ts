import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CommentsActions from './comments.actions';
import { CommentsEffects } from './comments.effects';

describe('CommentsEffects', () => {
  let actions: Observable<Action>;
  let effects: CommentsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CommentsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CommentsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CommentsActions.initComments() });

      const expected = hot('-a-|', {
        a: CommentsActions.loadCommentsSuccess({ comments: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
