//function to toggle the display of the main nav when menu Icon is clicked
toggleNavDisplay = x =>{
	x.classList.toggle("change");
	const mainNav = document.querySelector(".main-nav");
	mainNav.classList.toggle("display-show");
}