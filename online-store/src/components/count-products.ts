import { getProducts } from '../index';
import { IProduct } from '../index';

export const countProducts = async (): Promise<void> => {
  const spanElems = document.getElementsByClassName('amount-products') as HTMLCollectionOf<HTMLElement>;
  const elemDescription = document.getElementsByClassName('product-desc') as HTMLCollectionOf<HTMLElement>;
  const descriptionArr: Array<HTMLElement> = Array.from(elemDescription);
  const spanArr: Array<HTMLElement> = Array.from(spanElems);
  const arrayOfProd: Array<IProduct> = await getProducts();
  for (let elem of spanArr) {
    let activeProd = 0;
    let allProd = 0;
    let prevSibling = elem.previousSibling as HTMLElement;
    arrayOfProd.forEach((item) => {
      if (elem.id === item.brand || elem.id === item.category) allProd++;
    });
    if (descriptionArr.length === 0) {
      elem.style.opacity = '0.5';
      if (prevSibling !== null) prevSibling.style.opacity = '0.5';
      activeProd = 0;
      elem.textContent = `${activeProd}/ ${allProd}`;
    }
    for (let item of descriptionArr) {
      if (item.textContent !== null) {
        if (item.textContent === elem.id) activeProd++;
      }
      elem.textContent = `${activeProd}/ ${allProd}`;
      if (activeProd === 0) {
        elem.style.opacity = '0.5';
        if (prevSibling !== null) prevSibling.style.opacity = '0.5';
      } else {
        elem.style.opacity = '1';
        if (prevSibling !== null) prevSibling.style.opacity = '1';
      }
    }
  }
};