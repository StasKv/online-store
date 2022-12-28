import './index.html';
import './style/style.scss';
import { createProductCard } from './components/product-card';
import { getArrayOfCategory } from './components/filter-category';
import { createCategoryFilter } from './components/filter-category';
import { getArrayOfBrand } from './components/filter-brand';
import { createBrandFilter } from './components/filter-brand';
import { createPriceFilter } from './components/filter-price';
import { setPriceRangeValues } from './components/filter-price';
import { createStockFilter } from './components/filter-stock';
import { setStockRangeValues } from './components/filter-stock';
import { countProducts } from './components/count-products';
import { setNoResults } from './components/set-no-results';

export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: Array<string>;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export const getProducts = async (): Promise<Array<IProduct>> => {
  const response = await fetch('https://dummyjson.com/products?limit=100');
  const data = await response.json();
  return data.products;
};

const startApplication = async () => {
  const products = await getProducts();
  products.forEach((item) => {
    createProductCard(item);
  });
};

const setInputsResult = async (): Promise<void> => {
  const inputElems = document.getElementsByClassName('input') as HTMLCollectionOf<HTMLInputElement>;
  const ProductsList = document.querySelector('.products-items') as HTMLElement;
  const priceInputMinValue = document.querySelector('.input-value-min') as HTMLElement;
  const priceInputMaxValue = document.querySelector('.input-value-max') as HTMLElement;
  const priceInputLeft = document.querySelector('.input-price-left') as HTMLInputElement;
  const priceInputRight = document.querySelector('.input-price-right') as HTMLInputElement;
  const stockInputMinValue = document.querySelector('.input-stock-value-min') as HTMLElement;
  const stockInputMaxValue = document.querySelector('.input-stock-value-max') as HTMLElement;
  const stockInputLeft = document.querySelector('.input-stock-left') as HTMLInputElement;
  const stockInputRight = document.querySelector('.input-stock-right') as HTMLInputElement;
  let inputArr: Array<HTMLInputElement> = Array.from(inputElems);
  let categoryArr: Array<string> = [];
  let brandArr: Array<string> = [];
  for (let item of inputArr) {
    if (item.classList.contains('input-category')) {
      categoryArr.push(item.id);
    }
    if (item.classList.contains('input-brand')) {
      brandArr.push(item.id);
    }
  }
  let changedCategoryArr: Array<string> = categoryArr;
  let changedBrandArr: Array<string> = brandArr;
  for (let item of inputArr) {
    item.addEventListener('click', async () => {
      const minPrice = parseInt(priceInputLeft.min);
      const maxPrice = parseInt(priceInputLeft.max);
      priceInputLeft.value = `${minPrice}`;
      priceInputRight.value = `${maxPrice}`;
      const minStock = parseInt(stockInputLeft.min);
      const maxStock = parseInt(stockInputLeft.max);
      stockInputLeft.value = `${minStock}`;
      stockInputRight.value = `${maxStock}`;
      while (ProductsList.lastElementChild) {
        ProductsList.removeChild(ProductsList.lastElementChild);
      }
      changedCategoryArr = [];
      changedBrandArr = [];
      for (let item of inputArr) {
        if (item.checked && item.classList.contains('input-category')) {
          changedCategoryArr.push(item.id);
        }
        if (item.checked && item.classList.contains('input-brand')) {
          changedBrandArr.push(item.id);
        }
      }
      changedCategoryArr = changedCategoryArr.length === 0 ? categoryArr : changedCategoryArr;
      changedBrandArr = changedBrandArr.length === 0 ? brandArr : changedBrandArr;
      console.log(priceInputLeft.value, priceInputRight.value);
      const products = await getProducts();
      products.forEach((elem) => {
        if (
          changedCategoryArr.includes(elem.category) &&
          changedBrandArr.includes(elem.brand) &&
          elem.price >= parseInt(priceInputLeft.value) &&
          elem.price <= parseInt(priceInputRight.value) &&
          changedBrandArr.includes(elem.brand) &&
          elem.stock >= parseInt(stockInputLeft.value) &&
          elem.stock <= parseInt(stockInputRight.value)
        ) {
          createProductCard(elem);
        }
      });
      countProducts();
      setPriceRangeValues();
      setStockRangeValues();
      setNoResults();
    });
  }
  priceInputLeft.addEventListener('input', () => {
    const pricePointLeft = document.querySelector('.point-left') as HTMLElement;
    let min = parseInt(priceInputLeft.min);
    let max = parseInt(priceInputLeft.max);
    priceInputLeft.value = `${Math.min(parseInt(priceInputLeft.value), parseInt(priceInputRight.value) - 1)}`;
    let percent = ((parseInt(priceInputLeft.value) - min) / (max - min)) * 100;
    pricePointLeft.style.left = `${percent}%`;
    priceInputMinValue.textContent = priceInputLeft.value;
  });
  priceInputRight.addEventListener('input', () => {
    const pricePointRight = document.querySelector('.point-right') as HTMLElement;
    let min = parseInt(priceInputRight.min);
    let max = parseInt(priceInputRight.max);
    priceInputRight.value = `${Math.max(parseInt(priceInputRight.value), parseInt(priceInputLeft.value) + 1)}`;
    let percent = ((parseInt(priceInputRight.value) - min) / (max - min)) * 100;
    pricePointRight.style.right = `${100 - percent}%`;
    priceInputMaxValue.textContent = priceInputRight.value;
  });

  priceInputLeft.addEventListener('change', async () => {
    const minStock = parseInt(stockInputLeft.min);
    const maxStock = parseInt(stockInputLeft.max);
    stockInputLeft.value = `${minStock}`;
    stockInputRight.value = `${maxStock}`;
    while (ProductsList.lastElementChild) {
      ProductsList.removeChild(ProductsList.lastElementChild);
    }
    const products = await getProducts();
    products.forEach((elem) => {
      if (
        changedCategoryArr.includes(elem.category) &&
        changedBrandArr.includes(elem.brand) &&
        elem.price >= parseInt(priceInputLeft.value) &&
        elem.price <= parseInt(priceInputRight.value) &&
        changedBrandArr.includes(elem.brand) &&
        elem.stock >= parseInt(stockInputLeft.value) &&
        elem.stock <= parseInt(stockInputRight.value)
      ) {
        createProductCard(elem);
      }
    });
    countProducts();
    setStockRangeValues();
    setNoResults();
  });
  priceInputRight.addEventListener('change', async () => {
    const minStock = parseInt(stockInputLeft.min);
    const maxStock = parseInt(stockInputLeft.max);
    stockInputLeft.value = `${minStock}`;
    stockInputRight.value = `${maxStock}`;
    while (ProductsList.lastElementChild) {
      ProductsList.removeChild(ProductsList.lastElementChild);
    }
    const products = await getProducts();
    products.forEach((elem) => {
      if (
        changedCategoryArr.includes(elem.category) &&
        changedBrandArr.includes(elem.brand) &&
        elem.price >= parseInt(priceInputLeft.value) &&
        elem.price <= parseInt(priceInputRight.value) &&
        changedBrandArr.includes(elem.brand) &&
        elem.stock >= parseInt(stockInputLeft.value) &&
        elem.stock <= parseInt(stockInputRight.value)
      ) {
        createProductCard(elem);
      }
    });
    countProducts();
    setStockRangeValues();
    setNoResults();
  });

  stockInputLeft.addEventListener('input', () => {
    const stockPointLeft = document.querySelector('.point-stock-left') as HTMLElement;
    let min = parseInt(stockInputLeft.min);
    let max = parseInt(stockInputLeft.max);
    stockInputLeft.value = `${Math.min(parseInt(stockInputLeft.value), parseInt(stockInputRight.value) - 1)}`;
    let percent = ((parseInt(stockInputLeft.value) - min) / (max - min)) * 100;
    stockPointLeft.style.left = `${percent}%`;
    stockInputMinValue.textContent = stockInputLeft.value;
  });
  stockInputRight.addEventListener('input', () => {
    const stockPointRight = document.querySelector('.point-stock-right') as HTMLElement;
    let min = parseInt(stockInputRight.min);
    let max = parseInt(stockInputRight.max);
    stockInputRight.value = `${Math.max(parseInt(stockInputRight.value), parseInt(stockInputLeft.value) + 1)}`;
    let percent = ((parseInt(stockInputRight.value) - min) / (max - min)) * 100;
    stockPointRight.style.right = `${100 - percent}%`;
    stockInputMaxValue.textContent = stockInputRight.value;
  });

  stockInputLeft.addEventListener('change', async () => {
    const minPrice = parseInt(priceInputLeft.min);
    const maxPrice = parseInt(priceInputLeft.max);
    priceInputLeft.value = `${minPrice}`;
    priceInputRight.value = `${maxPrice}`;
    while (ProductsList.lastElementChild) {
      ProductsList.removeChild(ProductsList.lastElementChild);
    }
    const products = await getProducts();
    products.forEach((elem) => {
      if (
        changedCategoryArr.includes(elem.category) &&
        changedBrandArr.includes(elem.brand) &&
        elem.price >= parseInt(priceInputLeft.value) &&
        elem.price <= parseInt(priceInputRight.value) &&
        changedBrandArr.includes(elem.brand) &&
        elem.stock >= parseInt(stockInputLeft.value) &&
        elem.stock <= parseInt(stockInputRight.value)
      ) {
        createProductCard(elem);
      }
    });
    countProducts();
    setPriceRangeValues();
    setNoResults();
  });
  stockInputRight.addEventListener('change', async () => {
    const minPrice = parseInt(priceInputLeft.min);
    const maxPrice = parseInt(priceInputLeft.max);
    priceInputLeft.value = `${minPrice}`;
    priceInputRight.value = `${maxPrice}`;
    while (ProductsList.lastElementChild) {
      ProductsList.removeChild(ProductsList.lastElementChild);
    }
    const products = await getProducts();
    products.forEach((elem) => {
      if (
        changedCategoryArr.includes(elem.category) &&
        changedBrandArr.includes(elem.brand) &&
        elem.price >= parseInt(priceInputLeft.value) &&
        elem.price <= parseInt(priceInputRight.value) &&
        changedBrandArr.includes(elem.brand) &&
        elem.stock >= parseInt(stockInputLeft.value) &&
        elem.stock <= parseInt(stockInputRight.value)
      ) {
        createProductCard(elem);
      }
    });
    countProducts();
    setPriceRangeValues();
    setNoResults();
  });
};

startApplication()
  .then(getArrayOfCategory)
  .then(createCategoryFilter)
  .then(getArrayOfBrand)
  .then(createBrandFilter)
  .then(createPriceFilter)
  .then(createStockFilter)
  .then(setInputsResult)
  .then(countProducts);
