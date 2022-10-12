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

//SLIDER JQUERY 

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

// const openItem = item => {
//   const container = item.closest('.team__avatar')
//   const content = container.find('.team__member-status')
//   const textcontent = content.find('.team__member-block')
//   const reqHeight = textcontent.height()

//   container.addClass('active-member')
//   content.height(reqHeight)
// }

// const closeEvery = container => {
//   const items = container.find('.team__member-status')
//   const itemCont = container.find('.team__avatar')
//   itemCont.removeClass('active-member')
//   items.height(0)
// }

// $('.team__member').on('click', e => {

//   const $this = $(e.currentTarget);
//   const cont = $this.closest('.team__avatars')
//   const elemCont = $this.closest('.team__avatar')

//   if(elemCont.hasClass('active-member')) {
//     closeEvery(cont)
//   } else {
//     closeEvery(cont)
//     console.log($this);

//     openItem($this)
//   }
 
// })

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

$('.form').submit(e => {
  e.preventDefault()

  $.fancybox.open({
    src: "#modal",
    type: "inline",
  })
})

$('.app-close-modal').click(e => {
  e.preventDefault()

  $.fancybox.close()
})



//FORM-SEND

class AjaxForm{
  constructor(selector, settings){
    this.settings = settings
    this.form = document.querySelector(selector)
    this.fields = this.form.elements
    this.errors = []

    this.form.addEventListener('submit', (e) => {
      e.preventDefault()

      if (this.isValid()) {
        this.submit()
      }
    })

    this.form.addEventListener('input', (e) => this.validationField(e.target.name))
  }

  isValid() {
    const validators = this.settings.validators

    if(validators) {
      
      for(const fieldName in validators) {
        this.validationField(fieldName)
      }
    }

    if (!this.errors.length) {
      return true
    } else {
      return false
    }
  }

  validationField(fieldName) {
      
    if(fieldName && this.settings.validators[fieldName]) {
      try {  // проверяем есть заполнен ли fieldName и есть ли в AjaxForm(validators) такая функция
      this.settings.validators[fieldName](this.fields[fieldName]) // вызываем эту функцию в аргумент кладем имя поля которое нужно вернуть
      this.hideError(fieldName)
      } catch (error) {
        this.showError(fieldName, error.message)
      }
    }
  }

  showError(fieldName, text) {
    if (fieldName) {
      this.errors.push(fieldName)
      const field = this.fields[fieldName].closest ? this.fields[fieldName] : this.fields[fieldName][0]
      field.closest('label').classList.add('error')

      if (this.settings.placeholder) {
        field.placeholder = text
      }
    }
  }

  hideError(fieldName) {
    if (this.errors.length) {
      const field = this.fields[fieldName].closest ? this.fields[fieldName] : this.fields[fieldName][0]
      this.errors = this.errors.filter((field) => {
        field != fieldName
      })
      field.closest('label').classList.remove('error')
    }
  }

  getJSON() {
    return JSON.stringify(Object.fromEntries(new FormData(this.form)))
  }

  async submit() {
    try {
      const response = await fetch(this.settings.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: this.getJSON()
      })

      var body = await response.json()

      if (response.statusCode >= 400) {
        throw new Error('Invalid response')
      }

      this.settings.success(body)
      this.form.reset()

    } catch (error) {
      this.settings.error(error.message)
  }
}
}

new AjaxForm('#form', {
  url: "https://webdev-api.loftschool.com/sendmail",
  placeholder: true,
  validators: {
    name: function(field) {
      if(field.value.length < 3) {
        throw new Error('Name not valid');
      } 
    },
    phone: function(field) {
      if(field.value.length < 3) {
        throw new Error('phone not valid');
      } 
    },
    comment: function(field) {
      if(!field.value.length) {
      throw new Error('text not valid');
      }
    },
    dontcall: function(field) {
      if(!field.checked) {
      throw new Error('is not checked');
      }
    },
  },
  error:(body) => {
    console.log(body);
  },
  success:(body) => { 
    console.log(body.message) }

})

// PLAYER

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '405',
    width: '660',
    videoId: 'https://youtu.be/qIpHp72uMfc',
    events: {
      // 'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });
}


