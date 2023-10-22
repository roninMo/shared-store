import { CommentsEntity } from './comments.models';
import {
  commentsAdapter,
  CommentsPartialState,
  initialCommentsState,
} from './comments.reducer';
import * as CommentsSelectors from './comments.selectors';

describe('Comments Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCommentsId = (it: CommentsEntity) => it.id;
  const createCommentsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CommentsEntity);

  let state: CommentsPartialState;

  beforeEach(() => {
    state = {
      comments: commentsAdapter.setAll(
        [
          createCommentsEntity('PRODUCT-AAA'),
          createCommentsEntity('PRODUCT-BBB'),
          createCommentsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialCommentsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Comments Selectors', () => {
    it('selectAllComments() should return the list of Comments', () => {
      const results = CommentsSelectors.selectAllComments(state);
      const selId = getCommentsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = CommentsSelectors.selectEntity(state) as CommentsEntity;
      const selId = getCommentsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectCommentsLoaded() should return the current "loaded" status', () => {
      const result = CommentsSelectors.selectCommentsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectCommentsError() should return the current "error" state', () => {
      const result = CommentsSelectors.selectCommentsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
