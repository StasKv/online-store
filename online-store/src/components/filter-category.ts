import { getProducts } from '../index';
import { IProduct } from '../index';
import { createProductCard } from './product-card';

export const getArrayOfCategory = async () => {
  const arrayOfProd: Array<IProduct> = await getProducts();
  let arrayOfCategory: Array<string> = [];
  let result: Array<string> = [];
  arrayOfProd.forEach((item) => {
    arrayOfCategory.push(item.category);
  });
  arrayOfCategory.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });
  return result;
};

export const createCategoryFilter = async () => {
  const filters = document.querySelector('.filters') as HTMLElement;
  const categoryFilter = document.createElement('div');
  categoryFilter.classList.add('filter-category');
  filters.append(categoryFilter);
  let listOfCategories: Array<string> = await getArrayOfCategory()
  listOfCategories.forEach(item => {
    const categoryElem = document.createElement('div');
    categoryElem.classList.add('item-category');
    const categoryInput = document.createElement('input');
    categoryInput.classList.add('input-category');
    const categoryLabel = document.createElement('label');
    categoryLabel.classList.add('label-category');
    categoryInput.type = 'checkbox';
    categoryInput.id = `${item}`;
    categoryLabel.htmlFor = `${item}`;
    categoryLabel.textContent = `${item}`;
    categoryFilter.append(categoryElem);
    categoryElem.append(categoryInput);
    categoryElem.append(categoryLabel);
  })

  const collectionFilter = document.getElementsByClassName('input-category') as HTMLCollectionOf<HTMLInputElement>;
  const ProductsList = document.querySelector('.products-items') as HTMLElement;
  let arrayOfInputs: Array<HTMLInputElement> = Array.from(collectionFilter);
  for (let item of arrayOfInputs) {
  item.addEventListener('click', async () => {
    while (ProductsList.lastElementChild) {
      ProductsList.removeChild(ProductsList.lastElementChild);
    }
    for (let item of arrayOfInputs) {
      if (item.checked) {
        const products = await getProducts();
          products.forEach(elem => {
            if(elem.category === item.id) createProductCard(elem);
        })
      }
    }
  })
  }
};
