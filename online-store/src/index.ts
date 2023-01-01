import './index.html';
import './style/style.scss';
import { createProductCard } from './components/product-card';
import { openCartModal } from "./components/shopping-cart";
import { createCartModal } from "./components/shopping-cart";
import { createPayModal } from "./components/pay-modal";

import webpack from './img/webpack.png';

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

export let products: Array<IProduct>;
export let cartTotal = document.querySelector(".cart-total") as HTMLSpanElement;
export const shoppingCart = document.querySelector(".shopping-cart") as HTMLDivElement;
const mainWrapper = document.querySelector(".main-wrapper") as HTMLDivElement;
export const productsItems = document.querySelector(".products-items") as HTMLDivElement;
export const main = document.querySelector(".main") as HTMLDivElement;
export const totalContent = document.querySelector(".total-content") as HTMLDivElement;
export const payWrapper = document.createElement("div");
export const headerLogo = document.querySelector(".header-logo");

export const addHandlerToElement = (eventName: string, element: Element, handler: () => void) => {
  element.addEventListener(eventName, handler);
}
export const removeHandlerFromElement = (eventName: string, element: Element, handler: () => void) => {
  element.removeEventListener(eventName, handler);
}

const getProducts = async (): Promise<Array<IProduct>> => {
  const response = await fetch("https://dummyjson.com/products?limit=100");
  const data = await response.json();
  return data.products;
}

const handlerShoppingCart = () => {
  openCartModal(mainWrapper);
  createCartModal();
}
export const removeHandlerFromShoppingCart = () => {
  removeHandlerFromElement("click", shoppingCart, handlerShoppingCart);
}
const startApplication = async () => {
  products = await getProducts();

  products.forEach(item => {
  createProductCard(item);

  });
  addHandlerToElement("click", shoppingCart, handlerShoppingCart);
  createPayModal();
} 
startApplication();

headerLogo?.addEventListener("click", () => {
  const shoppingCartWrapper = document.querySelector(".shopping-cart-wrapper");
  if (shoppingCartWrapper) {
    shoppingCartWrapper.remove();
    mainWrapper.style.display = "flex";
  }
  addHandlerToElement("click", shoppingCart, handlerShoppingCart);
})