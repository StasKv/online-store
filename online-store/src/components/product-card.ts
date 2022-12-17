import { IProduct } from "../index";

const productsItems = document.querySelector(".products-items") as HTMLDivElement;

export const createProductCard = (productData: IProduct) => {
  const productsItem = document.createElement("div");
  productsItem.classList.add("products-item");
  const itemTitle = document.createElement("div");
  itemTitle.classList.add("item-title");
  itemTitle.innerHTML = `${productData.title}`;
  const descriptionInfo = document.createElement("div");
  descriptionInfo.classList.add("description-info");
  const infoItems = document.createElement("ul");
  infoItems.classList.add("info-items");
  const liCategory = document.createElement("li");
  const spanCategory = document.createElement("span");
  spanCategory.innerHTML = `Category: ${productData.category}`
  const liBrand = document.createElement("li");
  const spanBrand = document.createElement("span");
  spanBrand.innerHTML = `Brand: ${productData.brand}`;
  const liPrice = document.createElement("li");
  const spanPrice = document.createElement("span");
  spanPrice.innerHTML = `Price: ${productData.price}`;
  const liDiscount = document.createElement("li");
  const spanDiscount = document.createElement("span");
  spanDiscount.innerHTML = `Discount: ${productData.discountPercentage}`;
  const liRating = document.createElement("li");
  const spanRating = document.createElement("span");
  spanRating.innerHTML = `Rating: ${productData.rating}`;
  const liStock = document.createElement("li");
  const spanStock = document.createElement("span");
  spanStock.innerHTML = `Stock: ${productData.stock}`;
  const cardButtons = document.createElement("div");
  cardButtons.classList.add("card-buttons");
  const addToCart = document.createElement("button");
  addToCart.classList.add("add-to-cart");
  addToCart.innerHTML = "Add to cart";
  const detailsProduct = document.createElement("button");
  detailsProduct.classList.add("details-product");
  detailsProduct.innerHTML = "Details";
  productsItem.style.background = `url(${productData.images[0]}) 0% 0% / cover`;



  productsItems.append(productsItem);
  productsItem.append(itemTitle);
  productsItem.append(descriptionInfo);
  descriptionInfo.append(infoItems);
  infoItems.append(liCategory);
  liCategory.append(spanCategory);
  infoItems.append(liBrand);
  liBrand.append(spanBrand);
  infoItems.append(liPrice);
  liPrice.append(spanPrice);
  infoItems.append(liDiscount);
  liDiscount.append(spanDiscount);
  infoItems.append(liRating);
  liRating.append(spanRating);
  infoItems.append(liStock);
  liStock.append(spanStock);
  productsItem.append(cardButtons);
  cardButtons.append(addToCart);
  cardButtons.append(detailsProduct);
  
  return productsItem;
}
