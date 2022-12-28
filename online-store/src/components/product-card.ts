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
  spanCategory.innerHTML = `Category: `;
  const spanProductCategory = document.createElement("span");
  spanProductCategory.classList.add('product-category', 'product-desc');
  spanProductCategory.innerHTML = `${productData.category}`;
  const liBrand = document.createElement("li");
  const spanBrand = document.createElement("span");
  spanBrand.innerHTML = `Brand: `;
  const spanProductBrand = document.createElement("span");
  spanProductBrand.classList.add('product-category', 'product-desc');
  spanProductBrand.innerHTML = `${productData.brand}`;
  const liPrice = document.createElement("li");
  const spanPrice = document.createElement("span");
  const spanProductPrice = document.createElement("span");
  spanProductPrice.classList.add('product-price');
  spanPrice.innerHTML = `Price: `;
  spanProductPrice.innerHTML = `${productData.price}`;
  spanProductPrice.id = `${productData.price}`;
  const liDiscount = document.createElement("li");
  const spanDiscount = document.createElement("span");
  spanDiscount.innerHTML = `Discount: ${productData.discountPercentage}`;
  const liRating = document.createElement("li");
  const spanRating = document.createElement("span");
  spanRating.innerHTML = `Rating: ${productData.rating}`;
  const liStock = document.createElement("li");
  const spanStock = document.createElement("span");
  const spanProductStock = document.createElement("span");
  spanProductStock.classList.add('product-stock');
  spanStock.innerHTML = `Stock: `;
  spanProductStock.innerHTML = `${productData.stock}`;
  spanProductStock.id = `${productData.stock}`;
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
  liCategory.append(spanProductCategory);
  infoItems.append(liBrand);
  liBrand.append(spanBrand);
  liBrand.append(spanProductBrand);
  infoItems.append(liPrice);
  liPrice.append(spanPrice);
  liPrice.append(spanProductPrice);
  infoItems.append(liDiscount);
  liDiscount.append(spanDiscount);
  infoItems.append(liRating);
  liRating.append(spanRating);
  infoItems.append(liStock);
  liStock.append(spanStock);
  liStock.append(spanProductStock);
  productsItem.append(cardButtons);
  cardButtons.append(addToCart);
  cardButtons.append(detailsProduct);
  
  return productsItem;
}
