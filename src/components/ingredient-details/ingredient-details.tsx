import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import { setPreviewIngredientId } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { getPreviewIngredient } from '../../services/selectors/ingredientsSelectors';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const ingredientData = useSelector(getPreviewIngredient);
  const { id } = useParams<'id'>();

  useEffect(() => {
    if (id) {
      dispatch(setPreviewIngredientId(id));
    }

    return () => {
      dispatch(setPreviewIngredientId(null));
    };
  }, [id]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
