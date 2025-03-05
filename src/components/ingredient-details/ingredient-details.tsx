import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import {
  getCurrentIngredient,
  getIsIngredientLoading,
  setCurrentIngredient
} from '../../services/slices/ingredients/ingredients';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(getIsIngredientLoading);
  const ingredientData = useSelector(getCurrentIngredient);
  const { id } = useParams<'id'>();

  useEffect(() => {
    if (id) {
      dispatch(setCurrentIngredient(id));
    }
  }, [id, isIngredientsLoading]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
