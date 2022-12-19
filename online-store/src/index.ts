import './index.html';
import './style/style.scss';
import { createProductCard } from './components/product-card';
import { getArrayOfCategory } from './components/filter-category';
import { createCategoryFilter } from './components/filter-category';
import { getArrayOfBrand } from './components/filter-brand';
import { createBrandFilter } from './components/filter-brand';

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
  const response = await fetch("https://dummyjson.com/products?limit=100");
  const data = await response.json();
  return data.products;
}

const startApplication = async () => {
  const products = await getProducts();
  products.forEach(item => {
  createProductCard(item);
  })
} 

startApplication();
getArrayOfCategory();
createCategoryFilter();
getArrayOfBrand();
createBrandFilter();

