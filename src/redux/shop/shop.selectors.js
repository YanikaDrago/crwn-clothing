import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';


const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(  // преобразовывает объект в массив
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = memoize((collectionUrlParam) =>
createSelector(
  [selectCollections],
  (collections) => collections[collectionUrlParam]
)
);