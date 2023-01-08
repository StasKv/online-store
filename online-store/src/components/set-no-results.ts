export const setNoResults = (): void => {
  const priceInputMinValue = document.querySelector('.input-value-min') as HTMLElement;
  const priceInputMaxValue = document.querySelector('.input-value-max') as HTMLElement;
  const priceInputSlider = document.querySelector('.price-slider') as HTMLElement;
  const stockInputSlider = document.querySelector('.stock-slider') as HTMLElement;
  const stockInputMinValue = document.querySelector('.input-stock-value-min') as HTMLElement;
  const stockInputMaxValue = document.querySelector('.input-stock-value-max') as HTMLElement;
  const productsContainer = document.querySelector('.products-items') as HTMLElement;
  const priceValuesContainer = document.querySelector('.input-price-value-container') as HTMLElement;
  const stockValuesContainer = document.querySelector('.input-stock-value-container') as HTMLElement;
  const noProductsElem = document.createElement('div');
  const noPriceValueElem = document.createElement('div');
  const noStockValueElem = document.createElement('div');
  const addedChildIndex = 2;
  noProductsElem.classList.add('no-products');
  noPriceValueElem.classList.add('no-price-value');
  noStockValueElem.classList.add('no--stock-value');
  const elemDescription = document.getElementsByClassName('product-desc') as HTMLCollectionOf<HTMLElement>;
  const descriptionArr: Array<HTMLElement> = Array.from(elemDescription);
  console.log(descriptionArr);
  noPriceValueElem.remove();
  noStockValueElem.remove();
  if (descriptionArr.length === 0) {
    priceInputMinValue.textContent = '';
    priceInputMaxValue.textContent = '';
    stockInputMinValue.textContent = '';
    stockInputMaxValue.textContent = '';
    noProductsElem.textContent = 'No products found';
    noPriceValueElem.textContent = 'Not found';
    noStockValueElem.textContent = 'Not found';
    productsContainer.append(noProductsElem);
    if (!priceValuesContainer.children[addedChildIndex]) {
      priceValuesContainer.append(noPriceValueElem);
      stockValuesContainer.append(noStockValueElem);
    }
    priceInputSlider.style.display = 'none';
    stockInputSlider.style.display = 'none';
  } else {
    if (priceValuesContainer.lastElementChild && priceValuesContainer.children[addedChildIndex]) {
      priceValuesContainer.removeChild(priceValuesContainer.lastElementChild);
    }
    if (stockValuesContainer.lastElementChild && stockValuesContainer.children[addedChildIndex]) {
      stockValuesContainer.removeChild(stockValuesContainer.lastElementChild);
    }
    priceInputSlider.style.display = 'block';
    stockInputSlider.style.display = 'block';
  }
};