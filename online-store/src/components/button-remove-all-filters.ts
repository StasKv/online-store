import { getProducts } from '../index';
import { createProductCard } from './product-card';
import { setPriceRangeValues } from './filter-price';
import { setStockRangeValues } from './filter-stock';
import { chooseProduct } from './product-description-page';
import { countProducts } from './count-products';
import { setFoundResult } from './found-result';

export const createResetFiltersButton = async (): Promise<void> => {
  const filters = document.querySelector('.filters') as HTMLElement;
  const resetFiltersButton = document.createElement('div');
  resetFiltersButton.classList.add('reset-filters-button');
  resetFiltersButton.textContent = 'Reset Filters'
  filters.append(resetFiltersButton);
}

export const resetFilters = async (): Promise<void> => {
  const resetFiltersButton = document.querySelector('.reset-filters-button') as HTMLElement;
  const inputsCategories = document.querySelectorAll('.input-category') as NodeListOf<HTMLInputElement>;
  const inputsBrands = document.querySelectorAll('.input-brand') as NodeListOf<HTMLInputElement>;
  const ProductsList = document.querySelector('.products-items') as HTMLElement;
  resetFiltersButton.addEventListener('click', async (): Promise<void> => {
    while (ProductsList.lastElementChild) {
      ProductsList.removeChild(ProductsList.lastElementChild);
    }
    inputsCategories.forEach((elem) => {
      if (elem.checked) elem.checked = false;
    })
    inputsBrands.forEach((elem) => {
      if (elem.checked) elem.checked = false;
    })
    const products = await getProducts();
      products.forEach((elem) => {
        createProductCard(elem);
      })
    chooseProduct();
    countProducts();
    setPriceRangeValues();
    setStockRangeValues();
    setFoundResult();
  })
}
