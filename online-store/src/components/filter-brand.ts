import { getProducts } from '../index';
import { IProduct } from '../index';
import { createProductCard } from './product-card';

export const getArrayOfBrand = async () => {
  const arrayOfProd: Array<IProduct> = await getProducts();
  let arrayOfBrand: Array<string> = [];
  let result: Array<string> = [];
  arrayOfProd.forEach((item) => {
    arrayOfBrand.push(item.brand);
  });
  arrayOfBrand.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });
  return result;
};

export const createBrandFilter = async () => {
  const filters = document.querySelector('.filters') as HTMLElement;
  const brandFilter = document.createElement('div');
  brandFilter.classList.add('filter-brand');
  filters.append(brandFilter);
  let listOfBrands: Array<string> = await getArrayOfBrand();
  listOfBrands.forEach((item) => {
    const brandElem = document.createElement('div');
    brandElem.classList.add('item-brand');
    const brandInput = document.createElement('input');
    brandInput.classList.add('input-brand');
    const brandLabel = document.createElement('label');
    brandLabel.classList.add('label-brand');
    brandInput.type = 'checkbox';
    brandInput.id = `${item}`;
    brandLabel.htmlFor = `${item}`;
    brandLabel.textContent = `${item}`;
    brandFilter.append(brandElem);
    brandElem.append(brandInput);
    brandElem.append(brandLabel);
  });

  const collectionFilter = document.getElementsByClassName('input-brand') as HTMLCollectionOf<HTMLInputElement>;
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
          products.forEach((elem) => {
            if (elem.brand === item.id) createProductCard(elem);
          });
        }
      }
    });
  }
};
