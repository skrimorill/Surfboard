const sliderProducts = $('.products__list').bxSlider({
  pager: false,
  controls: false,
})

$('.products__slide-arrow--prev').click(e => {
  e.preventDefault()
  
  sliderProducts.goToPrevSlide()
})
$('.products__slide-arrow--next').click(e => {
  e.preventDefault()
  
  sliderProducts.goToNextSlide()
})