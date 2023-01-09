
export const setFoundResult = () => {
  const foundResult = document.querySelector('.found') as HTMLElement;
  const productsItem = document.querySelectorAll('.products-item') as NodeListOf<HTMLElement>;
  if(productsItem.length === 0) {
    foundResult.textContent = `Found: No products found`;
  } else {
    foundResult.textContent = `Found: ${productsItem.length}`;
  }
}