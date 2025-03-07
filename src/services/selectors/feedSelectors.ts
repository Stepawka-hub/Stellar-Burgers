import { createSelector } from '@reduxjs/toolkit';
import { getPreviewOrderNumber, getOrdersSelector } from '../slices/feedSlice';

export const getPreviewOrderSelector = createSelector(
  getOrdersSelector,
  getPreviewOrderNumber,
  (orders, previewOrderNumber) =>
    orders.find((o) => o.number === previewOrderNumber)
);
