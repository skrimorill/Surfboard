class Modal {
  constructor(selector) {
    this.fullscreenMenu = document.querySelector(selector)
    document.addEventListener("click", e => {
      const targetButtonEvent = e.target.closest('[data-event]')
      if(targetButtonEvent) {
        const event = targetButtonEvent.dataset.event
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

// TEAM

const openItem = item => {
  const container = item.closest(".team__avatar")
  const contentBlock = container.find(".team__member-status")
  const textBlock = container.find(".team__member-block")
  const reqHeight = textBlock.height()

  container.addClass("active")
  contentBlock.height(reqHeight)
}

const closeEveryItem = container => {
  const items = container.find(".team__member-status")
  const itemsContainer = container.find(".team__avatar")
  
  itemsContainer.removeClass("active")
  items.height(0)
}

$('.team__member').click(e => {
  const $this = $(e.currentTarget)
  const container2 = $this.closest(".team__avatars")
  const elemContainer = $this.closest(".team__avatar")


  if (elemContainer.hasClass("active")) {
    closeEveryItem(container2)
  } else {
    closeEveryItem(container2)
    openItem($this)
  }

})


// MAP

let myMap;
const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.752004, 37.576133],
    zoom: 11,
    controls: []
  });

  let dot = new ymaps.Placemark([55.752004, 37.576133], {}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "./img/marker.png",
    iconImageSize: [46, 57],
    iconImageOffset: [-35, -52],
  
  }) 

  

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './img/icons/marker.svg',
    iconImageSize: [46, 57],
    iconImageOffset: [-35, -52]
  });
  
  myMap.geoObjects.add(dot);
  
  myMap.behaviors.disable('scrollZoom');
 };
 
ymaps.ready(init);



