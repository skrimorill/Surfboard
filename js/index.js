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

//SLIDER

// class Slider {
//   constructor (selector) {
//     this.slider = document.querySelector(selector)
//     this.courent = INITIAL_NUMBER_SLIDE 
//     this.slideCount = this.slider.children.length
//   }
//   next() {
//     if(this.courent < this.slideCount) {
//       this.courent++
//     }
//     this.trannslate()
//   }

//   prev() {
//     if(this.courent > 1) {
//       this.courent--
//     }
//     this.trannslate()
//   }

//   trannslate() {
//     this.slider.style.transform = `translateX(-${(this.courent - 1) * 100}%)`
//   }

//   setEventListener() {
//   const sliderPrev = document.querySelector("#slider-prev")
//   const sliderNext = document.querySelector("#slider-next")
  
//   sliderPrev.addEventListener('click', () => {
//     this.prev()
//   })

//   sliderNext.addEventListener('click', () => {
//     this.next()
//   })
//   }
// }


// const slider = new Slider('#products-slider')
// slider.setEventListener()

// SLIDER JQUERY 

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

//TEAM
// const teamMember = document.querySelectorAll('.team__member')
// const teamMemberStatus = document.querySelector('.team__member-status')

const openItem = item => {
  const container = item.closest('.team__avatar')
  const content = container.find('.team__member-status')
  const textcontent = content.find('.team__member-block')
  const reqHeight = textcontent.height()

  container.addClass('active-member')
  content.height(reqHeight)
}

const closeEvery = container => {
  const items = container.find('.team__member-status')
  const itemCont = container.find('.team__avatar')
  itemCont.removeClass('active-member')
  items.height(0)
}

$('.team__member').on('click', e => {

  const $this = $(e.currentTarget);
  const cont = $this.closest('.team__avatars')
  const elemCont = $this.closest('.team__avatar')

  if(elemCont.hasClass('active-member')) {
    closeEvery(cont)
  } else {
    closeEvery(cont)
    console.log($this);

    openItem($this)
  }
  // closeEvery(cont)
  // console.log($this);

  // openItem($this)

  // $('.team__member-status').toggleClass('team__member-status--active')
})

// let teamMemberStatusHeight = 68

// const teamFunc = function() {
//   for(let el of teamMember) {
//     el.addEventListener('click', () => {
//       let card = this.
//       console.log(card);
//       card.teamMemberStatus.style.height = `${teamMemberStatusHeight}px`;
//     })
// }
// }

// teamFunc()

// teamMember.addEventListener('click', (event) => {
//   for (let el of teamMember) {
//     console.log(el);
//     if (event.target === el) {
//       teamMemberStatus.style.height = `${teamMemberStatusHeight}px`;
//     }
//   }

//   console.log(teamTargetEvent);
  
// })




//REVIEWS

const findBlockBeAlias = (alias) => {
  $('.reviews__item').filter((ind, item) => { 
    return $(item).attr('data-linked-with') === alias;
  })
}

$('.reviews__switcher-link').click(e => {
  e.preventDefault()

  const $this = $(e.currentTarget)
  const target = $this.attr('data-open')
  const itemShow = findBlockBeAlias(target)
  const curItem = $this.closest('.reviews__switcher-item')

  itemShow.addClass('active').siblings().removeClass('active')
  curItem.addClass('active').siblings().removeClass('active')
})


// FORM-MODAL

// $('.form').submit(e => {
//   e.preventDefault()

//   $.fancybox.open({
//     src: "#modal",
//     type: "inline",
//   })
// })

// $('.app-close-modal').click(e => {
//   e.preventDefault()

//   $.fancybox.close()
// })



//FORM-SEND

class AjaxForm{
  constructor(selector, settings){
    this.settings = settings
    this.form = document.querySelector(selector)
    this.fields = this.form.elements
    this.errors = []

    console.log(this.fields );
  }
}

new AjaxForm('#form', {
  url: "https://webdev-api.loftschool.com/sendmail",
  validators: {
    name: function(field) {
      console.log(field);
    },
    phone: function() {
      console.log(field);
    },
    comment: function() {

    },
  }
})