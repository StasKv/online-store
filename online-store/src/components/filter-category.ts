import { getProducts } from '../index';
import { IProduct } from '../index';

export const getArrayOfCategory = async (): Promise<Array<string>> => {
  const arrayOfProd: Array<IProduct> = await getProducts();
  let result: Array<string> = [];
  arrayOfProd.forEach((item) => {
    if (!result.includes(item.category)) {
      result.push(item.category);
    }
  });
  return result;
};

export const createCategoryFilter = async (): Promise<void> => {
  const filters = document.querySelector('.filters') as HTMLElement;
  const category = document.createElement('div');
  const categoryFilter = document.createElement('div');
  const categoryFilterHeader = document.createElement('h2');
  category.classList.add('category');
  categoryFilter.classList.add('filter-category');
  categoryFilterHeader.classList.add('filter-category-header');
  categoryFilterHeader.textContent = 'Category';
  filters.append(category);
  category.append(categoryFilterHeader);
  category.append(categoryFilter);
  let listOfCategories: Array<string> = await getArrayOfCategory()
  listOfCategories.forEach(item => {
    const categoryElem = document.createElement('div');
    categoryElem.classList.add('item-category');
    const categoryInput = document.createElement('input');
    categoryInput.classList.add('input', 'input-category');
    const categoryLabel = document.createElement('label');
    categoryLabel.classList.add('label-category');
    const countProducts = document.createElement('span');
    countProducts.classList.add('amount-products');
    categoryInput.type = 'checkbox';
    categoryInput.id = `${item}`;
    countProducts.id = `${item}`;
    categoryLabel.htmlFor = `${item}`;
    categoryLabel.textContent = `${item}`;
    categoryFilter.append(categoryElem);
    categoryElem.append(categoryInput);
    categoryElem.append(categoryLabel);
    categoryElem.append(countProducts);
  })
};
