import './index.html';
import './style/style.scss';
import { createProductCard } from './components/product-card';
import webpack from './img/webpack.png';

const b: Array<number> = [1,4,5];

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

const getProducts = async (): Promise<Array<IProduct>> => {
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