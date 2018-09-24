calculateCardTotal = (event) => {
  if(event.keyCode === 13){
    const cardPrice = parseFloat(document.querySelector('.card-price').innerHTML);
    const cardQuantity = parseFloat(document.querySelector('.card-quantity').value);
    const cardTotal = document.querySelector('.card-total');
    cardTotal.innerHTML = cardPrice*cardQuantity;
  }
}

const cardQuantity = document.querySelector('.card-quantity');
cardQuantity.addEventListener('keydown', calculateCardTotal);