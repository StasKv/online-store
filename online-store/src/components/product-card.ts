
import { cartTotal, IProduct, productsItems, totalContent} from "../index";

export let cartProductsId: Array<IProductInfo> = [];
let itemsInCart: number;
let cartTotalAmount: number;
export interface IButtonPlusMinus extends EventTarget {
  closest: any;
  hasAttribute: any;
  dataset: Record<"action","plus" | "minus">
  }

interface IProductInfo {
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
  counter: string;
}

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
  spanCategory.innerHTML = `Category: ${productData.category}`;
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
  const addToCartButton = document.createElement("button");
  addToCartButton.dataset.cart = "";
  addToCartButton.classList.add("add-to-cart");
  addToCartButton.dataset.id = String(productData.id);
  addToCartButton.innerHTML = "Add to cart";
  const counterWrapper = document.createElement("div");
  counterWrapper.classList.add("counter-wrapper");
  const minusButton = document.createElement("div");
  minusButton.innerHTML = "-";
  minusButton.classList.add("product-card-bnt-left");
  minusButton.dataset.action = "minus";
  const counterButton = document.createElement("div");
  counterButton.innerHTML = "1";
  counterButton.dataset.counter = "";
  counterButton.classList.add("product-card-counter")
  const plusButton = document.createElement("div");
  plusButton.innerHTML = "+";
  plusButton.classList.add("product-card-bnt-right");
  plusButton.dataset.action = "plus";
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
  cardButtons.append(addToCartButton);
  cardButtons.append(counterWrapper);
  counterWrapper.append(minusButton);
  counterWrapper.append(counterButton);
  counterWrapper.append(plusButton);

  const getProductInfo = (counter: string) => {
    return {
      brand: productData.brand,
      category: productData.category,
      description: productData.description,
      discountPercentage: productData.discountPercentage,
      id: productData.id,
      images: productData.images,
      price: productData.price,
      rating: productData.rating,
      stock: productData.stock,
      thumbnail: productData.thumbnail,
      title: productData.title,
      counter,
    }
  }
  
  addToCartButton.addEventListener("click", () => {
    if(addToCartButton.innerHTML === "Add to cart") {
      addToCart(getProductInfo(counterWrapper.querySelector("[data-counter]")?.innerHTML!), addToCartButton);
      counterWrapper.style.display = "none";
    } else if (addToCartButton.innerHTML === "Drop from cart") {
      dropFromCart(getProductInfo(counterWrapper.querySelector("[data-counter]")?.innerHTML!), addToCartButton);
      counterWrapper.style.display = "flex";
    };
  });

  return productsItem;
};


window.addEventListener("click", (event: MouseEvent) => {
  if (event.target) {
    const clickedDiv = event.target as IButtonPlusMinus;
    if (clickedDiv.dataset.action === "plus" || clickedDiv.dataset.action === "minus") {
      const counterWrapper = clickedDiv.closest(".counter-wrapper");
      const counter = counterWrapper.querySelector("[data-counter]");
      if(clickedDiv.dataset.action === "plus") {
        counter.innerHTML = ++counter.innerHTML;
      };
      if(clickedDiv.dataset.action === "minus") {
        if(parseInt(counter.innerHTML) > 1) {
          counter.innerHTML = --counter.innerHTML;
        };
      };
    };
  };
});

export const deleteFromCart = (id: number) => {
  cartProductsId = cartProductsId.filter(item => item.id !== id);
}

export const addToCart = (productInfo: IProductInfo, element: HTMLButtonElement) => {
  cartProductsId.push(productInfo);
  calculatingAmountInCart();
  calculatingItemsInCart();
  element.innerHTML = "Drop from cart";
}

export const dropFromCart = (productInfo: IProductInfo, element: HTMLButtonElement) => {
  cartProductsId = cartProductsId.filter(item => item.id !== productInfo.id);
  calculatingAmountInCart();
  calculatingItemsInCart();
  element.innerHTML = "Add to cart";
}


export const calculatingAmountInCart = () => {
  cartTotalAmount = 0;
  let amountToBePaid = document.querySelector(".amount-to-be-paid");
  cartProductsId.forEach((item) => {
    let amount: number = item.price * Number(item.counter);
    if (cartProductsId.length > 0) {
      cartTotalAmount += amount;
    };
  });
  if (cartProductsId.length === 0) {
    cartTotalAmount = 0;
  };
  cartTotal.innerHTML = `${String(cartTotalAmount)}`;
  if (amountToBePaid) {
    amountToBePaid.innerHTML = `${String(cartTotalAmount)}`;
  }
}

export const calculatingItemsInCart = () => {
  itemsInCart = 0;
  let summaryProducts = document.querySelector(".summary-products") as HTMLDivElement;
  cartProductsId.forEach((item) => {
    let amount: number = Number(item.counter);
    if (cartProductsId.length > 0) {
      itemsInCart += amount;
    } 
  });
  if(cartProductsId.length === 0) {
    itemsInCart = 0;
  };
  totalContent.innerHTML = `${String(itemsInCart)}`;
  if (summaryProducts) {
    summaryProducts.innerHTML = `Products: ${String(itemsInCart)}`;
  }
 
};
