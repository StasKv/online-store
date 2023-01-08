import { getProducts } from '../index';

const generateDescrPage = (title: string, category: string, brand: string, description: string, discount: number, rating: number, stock: number, price: number) => {
  const mainPage = document.querySelector('.main') as HTMLElement;
  const mainPageContent = document.querySelector('.main-wrapper') as HTMLElement;
  const descrPageContent = document.createElement('div') as HTMLElement;
  const breadCrumbsBlock = document.createElement('div') as HTMLElement;
  const productDescrBlock = document.createElement('div') as HTMLElement;
  const productDescrTitle = document.createElement('div') as HTMLElement;
  const fourColumnBlock = document.createElement('div') as HTMLElement;
  const productPhotosBlock = document.createElement('div') as HTMLElement;
  const productPhotoBlock = document.createElement('div') as HTMLElement;
  const productInfoBlock = document.createElement('div') as HTMLElement;
  const productInfoDescrBlock = document.createElement('div') as HTMLElement;
  const productInfoDescrTitleBlock = document.createElement('div') as HTMLElement;
  const productInfoDescrTextBlock = document.createElement('div') as HTMLElement;
  const productInfoDiscountBlock = document.createElement('div') as HTMLElement;
  const productInfoDiscountTitleBlock = document.createElement('div') as HTMLElement;
  const productInfoDiscountTextBlock = document.createElement('div') as HTMLElement;
  const productInfoRatingBlock = document.createElement('div') as HTMLElement;
  const productInfoRatingTitleBlock = document.createElement('div') as HTMLElement;
  const productInfoRatingTextBlock = document.createElement('div') as HTMLElement;
  const productInfoStockBlock = document.createElement('div') as HTMLElement;
  const productInfoStockTitleBlock = document.createElement('div') as HTMLElement;
  const productInfoStockTextBlock = document.createElement('div') as HTMLElement;
  const productInfoBrandBlock = document.createElement('div') as HTMLElement;
  const productInfoBrandTitleBlock = document.createElement('div') as HTMLElement;
  const productInfoBrandTextBlock = document.createElement('div') as HTMLElement;
  const productInfoCategoryBlock = document.createElement('div') as HTMLElement;
  const productInfoCategoryTitleBlock = document.createElement('div') as HTMLElement;
  const productInfoCategoryTextBlock = document.createElement('div') as HTMLElement;
  const productBuyBlock = document.createElement('div') as HTMLElement;
  const productPriceBlock = document.createElement('div') as HTMLElement;
  const productAddCartButton = document.createElement('div') as HTMLElement;
  const productBuyButton = document.createElement('div') as HTMLElement;

  mainPageContent.style.display = `none`;

  descrPageContent.classList.add('main-description-wrapper');
  breadCrumbsBlock.classList.add('bread-crumbs');
  productDescrBlock.classList.add('product-description-container');
  productDescrTitle.classList.add('product-description-title');
  fourColumnBlock.classList.add('four-column-block');
  productPhotosBlock.classList.add('product-photos-block');
  productPhotoBlock.classList.add('product-photo-block');
  productInfoBlock.classList.add('about-product-info-block');
  productInfoDescrBlock.classList.add('product-info-block');
  productInfoDescrTitleBlock.classList.add('product-info-title-block');
  productInfoDescrTextBlock.classList.add('product-info-text-block');
  productInfoDiscountBlock.classList.add('product-info-block');
  productInfoDiscountTitleBlock.classList.add('product-info-title-block');
  productInfoDiscountTextBlock.classList.add('product-info-text-block');
  productInfoRatingBlock.classList.add('product-info-block');
  productInfoRatingTitleBlock.classList.add('product-info-title-block');
  productInfoRatingTextBlock.classList.add('product-info-text-block');
  productInfoStockBlock.classList.add('product-info-block');
  productInfoStockTitleBlock.classList.add('product-info-title-block');
  productInfoStockTextBlock.classList.add('product-info-text-block');
  productInfoBrandBlock.classList.add('product-info-block');
  productInfoBrandTitleBlock.classList.add('product-info-title-block');
  productInfoBrandTextBlock.classList.add('product-info-text-block');
  productInfoCategoryBlock.classList.add('product-info-block');
  productInfoCategoryTitleBlock.classList.add('product-info-title-block');
  productInfoCategoryTextBlock.classList.add('product-info-text-block');
  productBuyBlock.classList.add('product-buy-block');
  productPriceBlock.classList.add('product-price-block');
  productAddCartButton.classList.add('product-buy-button');
  productBuyButton.classList.add('product-buy-button');
  mainPage.append(descrPageContent);
  descrPageContent.append(breadCrumbsBlock);
  descrPageContent.append(productDescrBlock);
  productDescrBlock.append(productDescrTitle);
  productDescrBlock.append(fourColumnBlock);
  fourColumnBlock.append(productPhotosBlock);
  fourColumnBlock.append(productPhotoBlock);
  fourColumnBlock.append(productInfoBlock);
  fourColumnBlock.append(productBuyBlock)
  productInfoBlock.append(productInfoDescrBlock);
  productInfoDescrBlock.append(productInfoDescrTitleBlock);
  productInfoDescrBlock.append(productInfoDescrTextBlock);
  productInfoBlock.append(productInfoDiscountBlock);
  productInfoDiscountBlock.append(productInfoDiscountTitleBlock);
  productInfoDiscountBlock.append(productInfoDiscountTextBlock);
  productInfoBlock.append(productInfoRatingBlock);
  productInfoRatingBlock.append(productInfoRatingTitleBlock);
  productInfoRatingBlock.append(productInfoRatingTextBlock);
  productInfoBlock.append(productInfoStockBlock);
  productInfoStockBlock.append(productInfoStockTitleBlock);
  productInfoStockBlock.append(productInfoStockTextBlock);
  productInfoBlock.append(productInfoBrandBlock);
  productInfoBrandBlock.append(productInfoBrandTitleBlock);
  productInfoBrandBlock.append(productInfoBrandTextBlock);
  productInfoBlock.append(productInfoCategoryBlock);
  productInfoCategoryBlock.append(productInfoCategoryTitleBlock);
  productInfoCategoryBlock.append(productInfoCategoryTextBlock);
  productBuyBlock.append(productPriceBlock);
  productBuyBlock.append(productAddCartButton);
  productBuyBlock.append(productBuyButton);

  breadCrumbsBlock.textContent = `Store  >>  ${category}  >>  ${brand} >>  ${title}`;
  productDescrTitle.textContent = title;
  productInfoDescrTitleBlock.textContent = `Description:`;
  productInfoDescrTextBlock.textContent = `${description}`;
  productInfoDiscountTitleBlock.textContent = `Discount:`;
  productInfoDiscountTextBlock.textContent = `${discount}`;
  productInfoRatingTitleBlock.textContent = `Rating:`;
  productInfoRatingTextBlock.textContent = `${rating}`;
  productInfoStockTitleBlock.textContent = `Stock:`;
  productInfoStockTextBlock.textContent = `${stock}`;
  productInfoBrandTitleBlock.textContent = `Brand:`;
  productInfoBrandTextBlock.textContent = `${brand}`;
  productInfoCategoryTitleBlock.textContent = `Category:`;
  productInfoCategoryTextBlock.textContent = `${category}`;
  productPriceBlock.textContent = `€${price}`;
  productAddCartButton.textContent = `ADD TO CART`;
  productBuyButton.textContent = `BUY NOW`;
}

export const chooseProduct = async () => {
  const detailsButtons = document.querySelectorAll('.details-product');
  console.log(detailsButtons)
  detailsButtons.forEach((elem) =>{
    elem.addEventListener('click', async () => {
      const parentElem = elem.parentNode;
      const productElem = parentElem !== null ? parentElem.parentNode: null;
      const productDescriptionElem = productElem !== null ? productElem.querySelector('.item-title') : null;
      const productDescription = productDescriptionElem !== null ? productDescriptionElem.textContent : null;
      const products = await getProducts();
      products.forEach((element) => {
        if (element.title === productDescription) {
          console.log(element)
          generateDescrPage(element.title, element.category, element.brand, element.description, element.discountPercentage, element.rating, element.stock, element.price)
        }
      });
    })
  })
}

