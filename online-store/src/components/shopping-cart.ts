import { mainModule } from "process";
import { main, products, payWrapper, removeHandlerFromShoppingCart, totalContent, cartTotal} from "../index";
import {calculatingItemsInCart, cartProductsId, calculatingAmountInCart, IButtonPlusMinus, deleteFromCart } from "../components/product-card";


let promoCodeArr: Array<number> = [];
/*interface IPromoCode {
  id: number,
  percentDiscount: number,
  namePromo: string
}*/

export const openCartModal = (mainWrapper: HTMLDivElement) => {
  mainWrapper.style.display = "none";
  main.style.minHeight = "80vh";
  main.style.position = "relative";
  removeHandlerFromShoppingCart();
}

export const openPayModal = (payWrapper: HTMLDivElement) => {
  payWrapper.style.display = "flex";
}

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
  quantityPerPageInput.type = 'text';
  quantityPerPageInput.value = `${1}`;
  quantityPerPageInput.classList.add("quantity-per-page-input");
  const pageNumbers = document.createElement("div");
  pageNumbers.classList.add("page-numbers");
  pageNumbers.innerHTML = "Page:";
  const pageNumbersBtnLeft = document.createElement("button");
  pageNumbersBtnLeft.classList.add("page-button-left");
  pageNumbersBtnLeft.innerHTML = "<";
  const currentPage = document.createElement("span");
  currentPage.classList.add("current-page");
  currentPage.innerHTML = "1";
  const pageNumbersBtnRight = document.createElement("button");
  pageNumbersBtnRight.classList.add("page-button-right");
  pageNumbersBtnRight.innerHTML = ">";
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
  promoTest.innerHTML = `Promo for test: '20sale', '10sale'`;
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
  pageNumbers.append(pageNumbersBtnLeft);
  pageNumbers.append(currentPage);
  pageNumbers.append(pageNumbersBtnRight);
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
  }
  
    cartProductsId.forEach((item, index) => {

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
          cartItemControlSum.innerHTML = `${item.counter}`;
          currentStock = currentStock - 1;
          dataStock.innerHTML = `Stock: ${currentStock}`;
          currentAmount = currentAmount + item.price;
          dataAmount.innerHTML = `Amount: €${currentAmount}`;

          calculatingItemsInCart();
          calculatingAmountInCart();

        } 
      });

      cartItemControlBtnLeft.addEventListener("click", (event) => {
      
        if (Number(item.counter) > 1) {
          item.counter = String(+item.counter - 1);
          cartItemControlSum.innerHTML = `${item.counter}`;
          currentStock = currentStock + 1;
          dataStock.innerHTML = `Stock: ${currentStock}`;
          currentAmount = currentAmount - item.price;
          dataAmount.innerHTML = `Amount: €${currentAmount}`;
         
        } else if (Number(item.counter) === 1) {
          const clickedDiv = event.target as IButtonPlusMinus;
          clickedDiv.closest(".products-in-cart-item").remove();
          deleteFromCart(item.id);
          
        }
        calculatingItemsInCart();
        calculatingAmountInCart();
      });


    });

    /*const promoCodes: Array<IPromoCode> = [
      {
        id: 1,
        percentDiscount: 10,
        namePromo: "sale10"
      },
      {
        id: 2,
        percentDiscount: 20,
        namePromo: "sale20"
      }
    ]*/

    promoCodeSubmit.addEventListener('click', function () {
      const currentAmountBlock = document.querySelector(".amount-to-be-paid") as HTMLDivElement;
      let currentAmount: string = currentAmountBlock.innerHTML;
      if (currentAmount) {
        if (promoCodeInput.value === "20sale" || promoCodeInput.value === "10sale") {
          showDiscount(currentAmount);
          console.log(promoCodeArr)
          amountToBePaid.style.textDecoration = "line-through";
          createPromoCodeElem();
        } 
        promoCodeInput.value = "";
        getDiscount();
      };
    });

    const getDiscount = () => {
      let discountSum: number = 0;
      promoCodeArr.forEach(item => {
        discountSum = discountSum + item;
      });
      console.log(discountSum);
    };

    const deleteDiscount = (elem: HTMLDivElement) => {
      promoCodeArr = promoCodeArr.filter(item => item !== Number(parseInt(elem.innerHTML)));
      console.log(promoCodeArr)
    }
    const showDiscount = (currentAmount: string) => {
      if (promoCodeInput.value === "20sale") {
        promoCodeArr.push(20);
        let sale = Number(currentAmount)-(Number(currentAmount)*0.2);
        discountedPrice.innerHTML = `Discounted price: €${sale}`;
      } else if (promoCodeInput.value === "10sale") {
        promoCodeArr.push(10);
        let sale = Number(currentAmount)-(Number(currentAmount)*0.1);
        discountedPrice.innerHTML = `Discounted price: €${sale}`;
      };
    }


    const createPromoCodeElem = () => {
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
        clickedDiv.closest(".promo-code-elem").remove();
        deleteDiscount(newPromoCode);
        });
      };
    };


  
 
    



  console.log(cartProductsId)
  buyNowButton.addEventListener("click", () => {
      openPayModal(payWrapper);
  });

  

  return shoppingCartWrapper;
};


