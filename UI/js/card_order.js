const calculateCardTotal = (event) => {
  if (event.keyCode === 13) {
    const cardPrice = parseFloat(document.querySelector('.card-price').innerHTML);
    const cardQuantity = parseFloat(document.querySelector('.card-quantity').value);
    const cardTotal = document.querySelector('.card-total');
    cardTotal.innerHTML = cardPrice * cardQuantity || 0;
  }
};

const cardContainer = document.querySelector('#meal-container');
cardContainer.addEventListener('keydown', (event) => {
  if (event.target && event.target.classList.contains('card-quantity')) {
    calculateCardTotal(event);
  }
});
