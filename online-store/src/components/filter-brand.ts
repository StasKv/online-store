import { getProducts } from '../index';
import { IProduct } from '../index';
//import { countProducts } from '../index';

export const getArrayOfBrand = async () : Promise<Array<string>>=> {
  const arrayOfProd: Array<IProduct> = await getProducts();
  let result: Array<string> = [];
  arrayOfProd.forEach((item) => {
    if (!result.includes(item.brand)) {
      result.push(item.brand);
    }
  });
  return result;
};

export const createBrandFilter = async (): Promise<void> => {
  const filters = document.querySelector('.filters') as HTMLElement;
  const brand = document.createElement('div');
  const brandFilterHeader = document.createElement('h2');
  const brandFilter = document.createElement('div');
  brand.classList.add('brand');
  brandFilter.classList.add('filter-brand');
  brandFilterHeader.classList.add('filter-brand-header');
  brandFilterHeader.textContent = 'Brand';
  filters.append(brand);
  brand.append(brandFilterHeader);
  brand.append(brandFilter);
  let listOfBrands: Array<string> = await getArrayOfBrand();
  listOfBrands.forEach((item) => {
    const brandElem = document.createElement('div');
    brandElem.classList.add('item-brand');
    const brandInput = document.createElement('input');
    brandInput.classList.add('input', 'input-brand');
    const brandLabel = document.createElement('label');
    brandLabel.classList.add('label-brand');
    const countProducts = document.createElement('span');
    countProducts.classList.add('amount-products');
    brandInput.type = 'checkbox';
    brandInput.id = `${item}`;
    countProducts.id = `${item}`;
    brandLabel.htmlFor = `${item}`;
    brandLabel.textContent = `${item}`;
    brandFilter.append(brandElem);
    brandElem.append(brandInput);
    brandElem.append(brandLabel);
    brandElem.append(countProducts);
  });
};

