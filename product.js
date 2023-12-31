const wideDiv = document.querySelector('.navigation');
const stickyParent = document.querySelector(".parent_wide_div");
const nextSection = document.querySelector('footer');
const navProducts = document.querySelectorAll('.nav_product');
const imageProduct = document.querySelector(".image");
const nav = document.querySelector("header");
let previousActiveNav = null;

const style = window.getComputedStyle(imageProduct);
const margin_top_and_bottom =  parseInt(style.getPropertyValue('margin-top'), 10) * 2;
document.body.style.height = `${document.body.offsetHeight + wideDiv.offsetWidth - wideDiv.offsetHeight*2}px`;

let threshold = wideDiv.offsetWidth - window.innerWidth;
let wideDivHeight = wideDiv.offsetHeight;
window.addEventListener('scroll', function(e) {
    let position = window.scrollY;

    if (position > wideDivHeight) {
      let adjustedPosition = position - wideDivHeight;

      if (adjustedPosition < threshold) {
        hightlightNav(Math.ceil(position));
          wideDiv.style.transform = `translateX(-${adjustedPosition}px)`;
          if (stickyParent.style.position !== 'sticky') {
              stickyParent.style.position = 'sticky';  
          }
      } else {
        wideDiv.style.transform = `translateX(-${threshold}px)`;
      }
    }
});



function navigateTo(index) {
  const itemWidth = stickyParent.offsetWidth;

  // Adjust the scroll position to match the translation
  const adjustedScrollPosition = (itemWidth * index + nav.offsetHeight + imageProduct.offsetHeight + margin_top_and_bottom);
  window.scrollTo(adjustedScrollPosition, adjustedScrollPosition);
}

navProducts.forEach((navProduct, index) => {
  navProduct.addEventListener('click', function() {
    toggleClassNav(navProduct);
    navigateTo(index);
  });
});

const toggleClassNav = (navProduct) => {
  if (previousActiveNav) {
    previousActiveNav.classList.remove("select");
  }
  previousActiveNav = navProduct;
  navProduct.classList.add("select");
}

const hightlightNav = (adjustedPosition) => {
  const itemWidth = stickyParent.offsetWidth;
  const adjustedScrollPosition = ( nav.offsetHeight + imageProduct.offsetHeight + margin_top_and_bottom);
  
  if (adjustedPosition >= adjustedScrollPosition && adjustedPosition < adjustedScrollPosition + itemWidth) {
    toggleClassNav(navProducts[0]);
  } else if (adjustedPosition >= adjustedScrollPosition + itemWidth && adjustedPosition < adjustedScrollPosition + itemWidth *2) {
    toggleClassNav(navProducts[1]);
  } else if (adjustedPosition >= adjustedScrollPosition + itemWidth *2 && adjustedPosition < adjustedScrollPosition + itemWidth*3) {
    toggleClassNav(navProducts[2]);
  } else if (adjustedPosition >= adjustedScrollPosition + itemWidth *3 && adjustedPosition < adjustedScrollPosition + itemWidth *4) {
    toggleClassNav(navProducts[3]);
  } else if (adjustedPosition >= adjustedScrollPosition + itemWidth *4 && adjustedPosition < adjustedScrollPosition + itemWidth * 5) {
    toggleClassNav(navProducts[4]);
  } else {
    toggleClassNav(navProducts[5]);
  }
}

