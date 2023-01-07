import { mainModule } from "process";
import { main, products, payWrapper, removeHandlerFromShoppingCart, totalContent, cartTotal } from "../index";
import {calculatingItemsInCart, cartProductsId, calculatingAmountInCart, IButtonPlusMinus, deleteFromCart, IProductInfo } from "../components/product-card";
interface IPromoCode {
  id: string,
  percentDiscount: number,
  namePromo: string;
};

const promoCodes: Array<IPromoCode> = [
  {
    id: "1",
    percentDiscount: 10,
    namePromo: "10%"
  },
  {
    id: "2",
    percentDiscount: 20,
    namePromo: "RSS"
  },
  {
    id: "3",
    percentDiscount: 5,
    namePromo: "5sale"
  }
];

let promoCodeArr: Array<number> = [];
let notes: Array<IProductInfo>;
let itemsPerPage: number = 3;

export const openCartModal = (mainWrapper: HTMLDivElement) => {
  mainWrapper.style.display = "none";
  main.style.minHeight = "80vh";
  main.style.position = "relative";
  removeHandlerFromShoppingCart();
};

export const openPayModal = (payWrapper: HTMLDivElement) => {
  payWrapper.style.display = "flex";
};

export const createCartModal = () => {
  const shoppingCartWrapper = document.createElement("div");
  shoppingCartWrapper.classList.add("shopping-cart-wrapper");
  const productsInCart = document.createElement("div");
  productsInCart.classList.add("products-in-cart");

  const productsInCartHeader = document.createElement("div");
  productsInCartHeader.classList.add("products-in-cart-header");
  const productsInCartTitle = document.createElement("h2");
  productsInCartTitle.classList.add("products-in-cart-title");
  productsInCartTitle.innerHTML = "Products in cart";
  const pageControl = document.createElement("div");
  pageControl.classList.add("page-control");
  const quantityPerPage = document.createElement("div");
  quantityPerPage.innerHTML = `Items: `;
  const quantityPerPageInput = document.createElement("input");
  quantityPerPageInput.type = 'number';
  quantityPerPageInput.step = "1";
  quantityPerPageInput.min = "0";
  quantityPerPageInput.value = `${itemsPerPage}`;
  quantityPerPageInput.classList.add("quantity-per-page-input");
  const pageNumbers = document.createElement("div");
  pageNumbers.classList.add("page-numbers");
  const currentPage = document.createElement("ul");
  currentPage.classList.add("current-page");
  const productsInCartList = document.createElement("div");
  productsInCartList.classList.add("products-in-cart-list");

  const totalCart = document.createElement("div");
  totalCart.classList.add("total-cart");
  const totalCartHeader = document.createElement("div");
  totalCartHeader.classList.add("total-cart-header");
  totalCartHeader.innerHTML = "Summary";
  const summaryProducts = document.createElement("p");
  summaryProducts.classList.add("summary-products");
  summaryProducts.innerHTML = `Products: ${totalContent.innerHTML}`;
  const amountToBePaidContainer = document.createElement("div");
  amountToBePaidContainer.classList.add("amount-to-be-paid-container");
  const amountToBePaidText = document.createElement("span");
  amountToBePaidText.classList.add("amount-to-be-paid-text");
  amountToBePaidText.innerHTML = "Total: €";
  const amountToBePaid = document.createElement("span");
  amountToBePaid.classList.add("amount-to-be-paid");
  amountToBePaid.innerHTML = `${cartTotal.innerHTML}`;
  const discountedPrice = document.createElement("p");
  discountedPrice.classList.add("discounted-price");
  discountedPrice.innerHTML = `Discounted price: €${""}`;
  const promoCode = document.createElement("div");
  promoCode.classList.add("promo-code");
  const promoCodeInput = document.createElement("input");
  promoCodeInput.type = "search";
  promoCodeInput.placeholder = "Enter promo code";
  const promoCodeSubmit = document.createElement("div");
  promoCodeSubmit.classList.add("promo-code-submit");
  promoCodeSubmit.innerHTML = "✔";
  const promoCodeList = document.createElement("div");
  promoCodeList.classList.add("promo-code-list");

  const promoTest = document.createElement("p");
  promoTest.innerHTML = `Promo for test: '5sale', '10%', RSS`;
  const buyNowButton = document.createElement("button");
  buyNowButton.innerHTML = "Buy now";
  buyNowButton.classList.add("buy-now");
  
  main.append(shoppingCartWrapper);
  shoppingCartWrapper.append(productsInCart);
  shoppingCartWrapper.append(totalCart);
  productsInCart.append(productsInCartHeader);
  productsInCartHeader.append(productsInCartTitle);
  productsInCartHeader.append(pageControl);
  pageControl.append(quantityPerPage);
  pageControl.append(quantityPerPageInput);
  pageControl.append(pageNumbers);
  pageNumbers.append(currentPage);
  productsInCart.append(productsInCartList);
  totalCart.append(totalCartHeader);
  totalCart.append(summaryProducts);
  totalCart.append(amountToBePaidContainer);
  amountToBePaidContainer.append(amountToBePaidText);
  amountToBePaidContainer.append(amountToBePaid);
  totalCart.append(discountedPrice);
  totalCart.append(promoCode);
  promoCode.append(promoCodeInput);
  promoCode.append(promoCodeSubmit);
  totalCart.append(promoCodeList);
  totalCart.append(promoTest);
  totalCart.append(buyNowButton);

  if (cartProductsId.length === 0 ) {
    productsInCartList.innerHTML = "Your shopping cart is empty!";
    productsInCartHeader.style.display = "none";
  };

  const renderPagination = (itemsOnPage: number, sourceProducts: Array<IProductInfo>) => { 

    let countOfItems = Math.ceil(sourceProducts.length / itemsOnPage);
    let items = [];
    function showPage(item: HTMLElement) {
      if (items.length > 0) {
        let active = document.querySelector(".current-page li.active");
        if (active) {
          active.classList.remove("active");
        };
        item.classList.add("active");
        let pageNum = +item.innerHTML;
        let start = (pageNum - 1) * itemsOnPage;
        let end = start + itemsOnPage;
        notes = cartProductsId.slice(start, end);
      };
      productsInCartList.innerHTML = "";
      renderCartItems()
    };
  
    for (let i = 1; i <= countOfItems; i++) {
      let li = document.createElement("li");
      li.innerHTML = String(i);
      currentPage.appendChild(li);
      items.push(li);
    };
    showPage(items[0])
    for (let item of items) {
      item.addEventListener("click", function() {
        showPage(this)
      });
    };
  };

  const renderCartItems = () => {
    notes.forEach((item: IProductInfo) => {
      const index = cartProductsId.findIndex(product => product.id === item.id)

      let currentStock = item.stock - Number(item.counter)
      let currentAmount = item.price * Number(item.counter);
   
      const productsInCartItem = document.createElement("div");
      productsInCartItem.classList.add("products-in-cart-item");
      const itemIndex = document.createElement("div");
      itemIndex.classList.add("products-in-cart-item-index");
      itemIndex.innerHTML = `${index + 1}`;
      const itemDescription = document.createElement("div");
      itemDescription.classList.add("products-in-cart-item-description");
      const itemDescriptionImg = document.createElement("img");
      itemDescriptionImg.classList.add("item-description-img");
      itemDescriptionImg.style.background = `url(${item.images[0]}) 0% 0% / cover`;
      const itemDescriptionContainer = document.createElement("div");
      itemDescriptionContainer.classList.add("item-description-container");
      const itemDescriptionTitle = document.createElement("div");
      itemDescriptionTitle.classList.add("item-description-title");
      itemDescriptionTitle.innerHTML = `${item.title}`;
      const itemDescriptionText = document.createElement("div");
      itemDescriptionText.classList.add("item-description-text");
      itemDescriptionText.innerHTML = `${item.description}`;
      const itemData = document.createElement("ul");
      itemData.classList.add("products-in-cart-item-data");
      const dataRating = document.createElement("li");
      dataRating.innerHTML = `Rating: ${item.rating}`;
      const dataDiscount = document.createElement("li");
      dataDiscount.innerHTML = `Discount: ${item.discountPercentage}%`;
      const dataStock = document.createElement("li");
      dataStock.innerHTML = `Stock: ${currentStock}`;
      const dataAmount = document.createElement("li");
      dataAmount.innerHTML = `Amount: €${currentAmount}`;
      const itemControl = document.createElement("div");
      itemControl.classList.add("products-in-cart-item-control");
      const cartItemControlBtnLeft = document.createElement("button");
      cartItemControlBtnLeft.classList.add("cart-item-control-btn-left");
      cartItemControlBtnLeft.innerHTML = "-";
      const cartItemControlSum = document.createElement("span");
      cartItemControlSum.classList.add("cart-item-control-sum");
      cartItemControlSum.innerHTML = `${item.counter}`;
      const cartItemControlBtnRight = document.createElement("button");
      cartItemControlBtnRight.classList.add("cart-item-control-btn-right");
      cartItemControlBtnRight.innerHTML = "+";
  
      productsInCartList.append(productsInCartItem);
      productsInCartItem.append(itemIndex);
      productsInCartItem.append(itemDescription);
      itemDescription.append(itemDescriptionImg);
      itemDescription.append(itemDescriptionContainer);
      itemDescriptionContainer.append(itemDescriptionTitle);
      itemDescriptionContainer.append(itemDescriptionText);
      itemDescription.append(itemData);
      itemData.append(dataRating);
      itemData.append(dataDiscount);
      itemData.append(dataStock);
      itemData.append(dataAmount);
      productsInCartItem.append(itemControl);
      itemControl.append(cartItemControlBtnLeft);
      itemControl.append(cartItemControlSum);
      itemControl.append(cartItemControlBtnRight);
  
      cartItemControlBtnRight.addEventListener("click", () => {
        if (Number(item.counter) > 0 && currentStock > 0) {
          item.counter = String(+item.counter + 1);
          currentStock = currentStock - 1;
          currentAmount = currentAmount + item.price;
          showCartData();
          calculatingItemsInCart();
          calculatingAmountInCart();
        };
        calculatingDiscountPrice();
      });
  
      cartItemControlBtnLeft.addEventListener("click", (event) => {
      
        if (Number(item.counter) > 1) {
          item.counter = String(+item.counter - 1);
          currentStock = currentStock + 1;
          currentAmount = currentAmount - item.price;
          showCartData();
        } else if (Number(item.counter) === 1) {
          const clickedDiv = event.target as IButtonPlusMinus;
          clickedDiv.closest(".products-in-cart-item")?.remove();
          deleteFromCart(item.id);
          currentPage.innerHTML = "";
          renderPagination(itemsPerPage,cartProductsId);
        };
        calculatingItemsInCart();
        calculatingAmountInCart();
        calculatingDiscountPrice();
        if (cartProductsId.length === 0 ) {
          productsInCartList.innerHTML = "Your shopping cart is empty!";
          productsInCartHeader.style.display = "none";
        };
      });
  
      const showCartData = () => {
        cartItemControlSum.innerHTML = `${item.counter}`;
        dataStock.innerHTML = `Stock: ${currentStock}`;
        dataAmount.innerHTML = `Amount: €${currentAmount}`;
      };
    });
  };
  
  renderPagination(itemsPerPage,cartProductsId);

  promoCodeSubmit.addEventListener('click', function () {
    const currentAmountBlock = document.querySelector(".amount-to-be-paid") as HTMLDivElement;
    let currentAmount: string = currentAmountBlock.innerHTML;
    if (currentAmount) {
      promoCodes.forEach(item => {
        if (promoCodeInput.value === item.namePromo) {
          if (!promoCodeArr.includes(item.percentDiscount)) {
            promoCodeArr.push(item.percentDiscount);
            calculatingDiscountPrice();
            createPromoCodeElem(item.percentDiscount);
          };
        };
      });
      promoCodeInput.value = "";
      getDiscount();
    };
  });

  const getDiscount = () => {
    let discountSum: number = 0;
    promoCodeArr.forEach(item => {
      discountSum = discountSum + item;
    });
  };

  const deleteDiscount = (percentDiscount: number) => {
    promoCodeArr = promoCodeArr.filter(item => item !== percentDiscount)
  };

  const createPromoCodeElem = (percentDiscount: number) => {
    const promoCodeElem = document.createElement("div");
    promoCodeElem.classList.add("promo-code-elem");
    const newPromoCode = document.createElement("p");
    const deletePromoCode = document.createElement("div");
    deletePromoCode.classList.add("delete-promo-code");
    newPromoCode.innerHTML = `${promoCodeInput.value}`;
    deletePromoCode.innerHTML = `✘`;
    promoCodeList.append(promoCodeElem);
    promoCodeElem.append(newPromoCode);
    promoCodeElem.append(deletePromoCode);

    if(deletePromoCode) {
      deletePromoCode.addEventListener("click", (event) => {
        const clickedDiv = event.target as IButtonPlusMinus;
        clickedDiv.closest(".promo-code-elem")?.remove();
        deleteDiscount(percentDiscount);
        calculatingDiscountPrice();
      });
    };
  };

  const calculatingDiscountPrice = () => {
    const currentAmountBlock = document.querySelector(".amount-to-be-paid") as HTMLDivElement;
    let currentAmount: string = currentAmountBlock.innerHTML;
    let totalDiscountPercentage = promoCodeArr.reduce((acc, number) => acc + number, 0);
    let newPrice = Number(currentAmount) - (Number(currentAmount) * totalDiscountPercentage * 0.01);
    if (promoCodeArr.length > 0) {
      amountToBePaid.style.textDecoration = "line-through";
      discountedPrice.innerHTML = `Discounted price: €${newPrice.toFixed(2)}`;
    } else {
      amountToBePaid.style.textDecoration = "none";
      discountedPrice.innerHTML = `Discounted price: €${""}`;
    };
  };
  
   
  buyNowButton.addEventListener("click", () => {
    if (cartProductsId.length > 0) {
      openPayModal(payWrapper);
    };
  });
 
  quantityPerPageInput.addEventListener("keyup", (event) => {
    itemsPerPage = Number(quantityPerPageInput.value)
    
    if(event.key === "Enter") {
      currentPage.innerHTML = "";
      renderPagination(itemsPerPage,cartProductsId);
    };
  });

  quantityPerPageInput.addEventListener("blur", () => {
    itemsPerPage = Number(quantityPerPageInput.value)
      currentPage.innerHTML = "";
      renderPagination(itemsPerPage,cartProductsId);
  });

  return shoppingCartWrapper;
};