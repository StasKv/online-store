
import { cartTotal, IProduct, productsItems, totalContent} from "../index";

export let cartProductsId: Array<IProductInfo> = [];
let itemsInCart: number;
let cartTotalAmount: number;
export interface IButtonPlusMinus extends Element {
  dataset: Record<"action","plus" | "minus">
  }

export interface IProductInfo {
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

export const getProductInfo = (counter: string, productData: IProduct) => {
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
  };
};

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
  const spanProductDiscount = document.createElement("span");
  spanProductDiscount.classList.add('product-discount');
  spanDiscount.innerHTML = `Discount: `;
  spanProductDiscount.innerHTML = `${productData.discountPercentage}`;
  spanProductDiscount.id = `${productData.discountPercentage}`;
  const liRating = document.createElement("li");
  const spanRating = document.createElement("span");
  const spanProductRating = document.createElement("span");
  spanProductRating.classList.add('product-rating');
  spanRating.innerHTML = `Rating: `;
  spanProductRating.innerHTML = `${productData.rating}`;
  spanProductRating.id = `${productData.rating}`;
  const liStock = document.createElement("li");
  const spanStock = document.createElement("span");
  const spanProductStock = document.createElement("span");
  spanProductStock.classList.add('product-stock');
  spanStock.innerHTML = `Stock: `;
  spanProductStock.innerHTML = `${productData.stock}`;
  spanProductStock.id = `${productData.stock}`;
  const cardButtons = document.createElement("div");
  cardButtons.classList.add("card-buttons");
  const addToCartButton = document.createElement("button");
  addToCartButton.dataset.cart = "";
  addToCartButton.classList.add("add-to-cart");
  addToCartButton.dataset.id = String(productData.id);
  addToCartButton.innerHTML = "Add to cart";
  const detailsButton = document.createElement("button");
  detailsButton.classList.add("details-product");
  detailsButton.innerHTML = "Details";
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
  liCategory.append(spanProductCategory);
  infoItems.append(liBrand);
  liBrand.append(spanBrand);
  liBrand.append(spanProductBrand);
  infoItems.append(liPrice);
  liPrice.append(spanPrice);
  liPrice.append(spanProductPrice);
  infoItems.append(liDiscount);
  liDiscount.append(spanDiscount);
  liDiscount.append(spanProductDiscount);
  infoItems.append(liRating);
  liRating.append(spanRating);
  liRating.append(spanProductRating);
  infoItems.append(liStock);
  liStock.append(spanStock);
  liStock.append(spanProductStock);
  productsItem.append(cardButtons);
  cardButtons.append(addToCartButton);
  cardButtons.append(detailsButton);
  cardButtons.append(counterWrapper);
  counterWrapper.append(minusButton);
  counterWrapper.append(counterButton);
  counterWrapper.append(plusButton);
  
  addToCartButton.addEventListener("click", () => {
    if(addToCartButton.innerHTML === "Add to cart") {
      addToCart(getProductInfo(counterWrapper.querySelector("[data-counter]")?.innerHTML!, productData), addToCartButton);
      counterWrapper.style.display = "none";
    } else if (addToCartButton.innerHTML === "Drop from cart") {
      dropFromCart(getProductInfo(counterWrapper.querySelector("[data-counter]")?.innerHTML!, productData), addToCartButton);
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
      const counter = counterWrapper?.querySelector("[data-counter]");
      if(counter) {
        if(clickedDiv.dataset.action === "plus") {
          let value = Number(counter.innerHTML);
          ++value;
          counter.innerHTML = String(value);
        };
        if(clickedDiv.dataset.action === "minus") {
          if(parseInt(counter.innerHTML) > 1) {
            let value = Number(counter.innerHTML);
            --value;
            counter.innerHTML = String(value);
          };
        };
      }
    };
  };
});

export const deleteFromCart = (id: number) => {
  cartProductsId = cartProductsId.filter(item => item.id !== id);


}

export const addToCart = (productInfo: IProductInfo, element?: HTMLButtonElement) => {
  cartProductsId.push(productInfo);
  calculatingAmountInCart();
  calculatingItemsInCart();
  if(Boolean(element)) {
    element!.innerHTML = "Drop from cart";
  };
};

export const dropFromCart = (productInfo: IProductInfo, element: HTMLButtonElement) => {
  cartProductsId = cartProductsId.filter(item => item.id !== productInfo.id);
  calculatingAmountInCart();
  calculatingItemsInCart();
  element.innerHTML = "Add to cart";
};


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

export const setAddOrDropName = () => {
 
  const buttons = document.querySelectorAll(".add-to-cart") as NodeListOf<HTMLButtonElement>;
  const plusMinusButtons = document.querySelectorAll(".counter-wrapper")as NodeListOf<HTMLDivElement>;
  for (let i = 0; i < buttons.length; i++) {
    const id = buttons[i].dataset.id
    const findProduct = cartProductsId.find((item) => item.id === Number(id));
    if(findProduct) {
      buttons[i].innerHTML = "Drop from cart";
      plusMinusButtons[i].style.display = "none";
    } 
  }
}
