class Modal {
  constructor(selector) {
    this.fullscreenMenu = document.querySelector(selector)
    document.addEventListener("click", e => {
      const targetButtonEvent = e.target.closest('[data-event]')
      if(targetButtonEvent) {
        const event = targetButtonEvent.dataset.event
        console.log(event);
        this[event]()
      }
    })
  }

  open() {
    this.fullscreenMenu.classList.add("fullscreen-menu--opened")
  }

  close() {
    this.fullscreenMenu.classList.remove("fullscreen-menu--opened")

  }
}

const fullscreenMenu = new Modal("#full-menu")



const INITIAL_NUMBER_SLIDE = 1

class Slider {
  constructor (selector) {
    this.slider = document.querySelector(selector)
    this.courent = INITIAL_NUMBER_SLIDE 
    this.slideCount = this.slider.children.length
  }
  next() {
    if(this.courent < this.slideCount) {
      this.courent++
    }
    this.trannslate()
  }

  prev() {
    if(this.courent > 1) {
      this.courent--
    }
    this.trannslate()
  }

  trannslate() {
    this.slider.style.transform = `translateX(-${(this.courent - 1) * 100}%)`
  }

  setEventListener() {
  const sliderPrev = document.querySelector("#slider-prev")
  const sliderNext = document.querySelector("#slider-next")
  
  sliderPrev.addEventListener('click', () => {
    this.prev()
  })

  sliderNext.addEventListener('click', () => {
    this.next()
  })
  }
}


const slider = new Slider('#products-slider')
slider.setEventListener()





 