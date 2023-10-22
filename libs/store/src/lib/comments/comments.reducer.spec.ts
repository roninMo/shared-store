import { Action } from '@ngrx/store';

import * as CommentsActions from './comments.actions';
import { CommentsEntity } from './comments.models';
import {
  CommentsState,
  initialCommentsState,
  commentsReducer,
} from './comments.reducer';

describe('Comments Reducer', () => {
  const createCommentsEntity = (id: string, name = ''): CommentsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Comments actions', () => {
    it('loadCommentsSuccess should return the list of known Comments', () => {
      const comments = [
        createCommentsEntity('PRODUCT-AAA'),
        createCommentsEntity('PRODUCT-zzz'),
      ];
      const action = CommentsActions.loadCommentsSuccess({ comments });

      const result: CommentsState = commentsReducer(
        initialCommentsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = commentsReducer(initialCommentsState, action);

      expect(result).toBe(initialCommentsState);
    });
  });
});
