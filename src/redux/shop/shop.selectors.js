import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';


const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(  // преобразовывает объект в массив
  [selectCollections],
  collections => 
  collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = memoize((collectionUrlParam) =>
createSelector(
  [selectCollections],
  (collections) => (collections ? collections[collectionUrlParam] : null)
)
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsCollectionLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections // !! - модифицируем возвращаемый {} в фактические логическое значение true (или false для '', null, 0) - для свойства  loading (если ничего не придет, то будет false)
);