import { createSelector } from '@reduxjs/toolkit';
import { getIngredientsSelector } from './ingredients';

export const getBunsSelector = createSelector(
  getIngredientsSelector,
  (ingredients) => ingredients.filter((i) => i.type === 'bun')
);

export const getSaucesSelector = createSelector(
  getIngredientsSelector,
  (ingredients) => ingredients.filter((i) => i.type === 'sauce')
);

export const getMainsSelector = createSelector(
  getIngredientsSelector,
  (ingredients) => ingredients.filter((i) => i.type === 'main')
);
