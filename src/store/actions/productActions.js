import { api } from '../../api/api.js';

export const setCategories = (categories) => ({ type: 'SET_CATEGORIES', payload: categories });
export const setProductList = (products) => ({ type: 'SET_PRODUCT_LIST', payload: products });
export const setTotal = (total) => ({ type: 'SET_TOTAL', payload: total });
export const setFetchState = (fetchState) => ({ type: 'SET_FETCH_STATE', payload: fetchState });
export const setLimit = (limit) => ({ type: 'SET_LIMIT', payload: limit });
export const setOffset = (offset) => ({ type: 'SET_OFFSET', payload: offset });
export const setFilter = (filter) => ({ type: 'SET_FILTER', payload: filter });

export const fetchCategoriesAction = () => async (dispatch, getState) => {
  const { categories } = getState().product;
  
 
  if (categories && categories.length > 0) return;

  try {
    const response = await api.get('/categories');
    dispatch(setCategories(response.data));
  } catch (error) {
    console.error('Kategoriler çekilirken hata oluştu:', error);
  }
};


export const fetchProductsAction = (params = {}) => async (dispatch) => {
  dispatch(setFetchState('FETCHING'));

  try {
    const response = await api.get('/products', { params });
    
    dispatch(setProductList(response.data.products));
    dispatch(setTotal(response.data.total)); 
    dispatch(setFetchState('FETCHED'));
  } catch (error) {
    console.error('Products fetch error:', error);
    dispatch(setFetchState('FAILED'));
  }
};

  export const setProductDetail = (product) => ({ type: 'SET_PRODUCT_DETAIL', payload: product });
  export const setDetailFetchState = (state) => ({ type: 'SET_DETAIL_FETCH_STATE', payload: state });


  export const fetchProductDetailAction = (productId) => async (dispatch) => {
    dispatch(setDetailFetchState('FETCHING'));
    try {
      const response = await api.get(`/products/${productId}`);
      dispatch(setProductDetail(response.data));
      dispatch(setDetailFetchState('FETCHED'));
    } catch (error) {
      console.error('Product detail fetch error:', error);
      dispatch(setDetailFetchState('FAILED'));
    }
  };