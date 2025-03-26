import { rootReducer, RootState } from '../../store';
import { initialState as appInitialState } from '../appSlice';
import { initialState as burgerConstructorInitialState } from '../burgerConstructorSlice';
import { initialState as feedInitialState } from '../feedSlice';
import { initialState as ingredientsInitialState } from '../ingredientsSlice';
import { initialState as profileInitialState } from '../profileSlice';
import { initialState as userInitialState } from '../userSlice';

describe('Правильная работа rootReducer', () => {
  const initialState: RootState = {
    app: appInitialState,
    ingredients: ingredientsInitialState,
    burgerConstructor: burgerConstructorInitialState,
    feed: feedInitialState,
    user: userInitialState,
    profile: profileInitialState
  };

  it('rootReducer возвращает корректное состояние', () => {
    const newState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });

    expect(newState).toEqual(initialState);
  });
});
