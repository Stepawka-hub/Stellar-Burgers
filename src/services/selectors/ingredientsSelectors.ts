import { createSelector } from '@reduxjs/toolkit';
import {
  getIngredientsSelector,
  getPreviewIngredientId
} from '@slices/ingredientsSlice';

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

export const getPreviewIngredient = createSelector(
  getIngredientsSelector,
  getPreviewIngredientId,
  (ingredients, previewIngredientId) =>
    ingredients.find((i) => i._id === previewIngredientId)
);
