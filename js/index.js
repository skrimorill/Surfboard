class Modal {
  constructor(selectors) {
    this.selectors = selectors
    this.modalShow = document.querySelector(selectors.id)

  }

  open() {
    this.modalShow.classList.add(this.selectors.active)
  }

  close() {
    this.modalShow.classList.remove(this.selectors.active)

  }

  setEventListener() {
    document.addEventListener("click", e => {
      const targetButtonEvent = e.target.closest('[data-event]')
      if(targetButtonEvent) {
        const event = targetButtonEvent.dataset.event
        this[event]()
      }
    })
  }
}


const fullscreenMenu = new Modal({id: "#full-menu", active: "fullscreen-menu--opened"})
fullscreenMenu.setEventListener()
const successShow = new Modal({id:"#modal", active: "modal--opened"})
const moadalAppClose = document.querySelector('.app-close-modal')
.addEventListener('click', () => {
  successShow.close()
})


// MODAL attempt 2

// class Modal {
//   constructor(selector, modClass) {
//     this.menu = document.querySelector(selector)
//     this._modClass = modClass
//   }

//   open() {
//     this.menu.classList.add(this._modClass)
//   }

//   close() {
//     this.menu.classList.remove(this._modClass)
//   }

//   setEventListener() {
    
//     this.menu.addEventListener('click', (e) => {
//       // e.preventDefault()

//       const targetButtonEvent = e.target.closest('[data-event]')
//       if (targetButtonEvent) {
//         const event = targetButtonEvent.dataset.event
//         this[event]()
//       }
//     }) 
//   }
// }

// const menu = new Modal('#full-menu', 'fullscreen-menu--opened')
// menu.setEventListener()
// console.log(menu);


// MODAL attempt 3

// class Modal {
//   constructor(selector, classMod){
//       this.popup = document.querySelector(selector);
//       this._classMod = classMod;
//   }

//   // слушатель закрытия попапа по кнопке esc
//   _handleEscUp = (evt) => {
//       if(evt.key ==='Escape'){
//           this.close()
//       }
//   }

//   open() {
//       this.popup.classList.add(this._classMod)
//       document.addEventListener('keyup', this._handleEscUp)
//   }

//   close(){ 
//       this.popup.classList.remove(this._classMod)
//       document.removeEventListener('keyup', this._handleEscUp)
//   }

//   setEventListener() {
//       //вешаем обрабочтик закрытия попапа по крестику, по оверлею, и если на элементе есть атрибут data-close="true"
//       this.popup.addEventListener('click', (evt) => {
//           if(evt.target.classList.contains('modal') ||  !!evt.target.closest('.button-full-close') || evt.target.dataset.close === 'true') {
//               this.close()
//           }
//       })

//       //вешаем обрабочтик открытия попапа если на элементе есть атрибут data-open="id открываемого попапа"
//       document.addEventListener('click', (e) => {
//           const targetButtonEvent = e.target.closest('[data-open]'); //если кликнули по кнопке открытия у которой есть атриюут data-open записываем в переменную эту кнопку
//           if(targetButtonEvent) {
//               const currentIdPopup = targetButtonEvent.dataset.open; //забираем значение id из атрибута кнопки по которой нажали
//               if(this.popup.id === currentIdPopup){ // проверям соотвествует ли id текущего попапа значению атрибут data-open
//                   this.open();
//               }
//           }
//       })
//   }

// }

// const menu = new Modal('#full-menu', 'fullscreen-menu--opened')
// menu.setEventListener()

// const successShow = new Modal("#modal", "modal--opened")
// successShow.setEventListener()


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




//REVIEWS

const findBlockBeAlias = (alias) => {
  return $('.reviews__item').filter((ind, item) => { 
    return $(item).attr('data-linked-with') === alias;
  })
}

  $('.reviews__switcher-item').click(e => {
  e.preventDefault()

  const $this = $(e.currentTarget)
  const target = $this.attr('data-open')
  const itemShow = findBlockBeAlias(target)
  const curItem = $this.closest('.reviews__switcher-item')

  itemShow.addClass('reviews__item--active').siblings().removeClass('reviews__item--active')
  curItem.addClass('reviews__switcher-item--active').siblings().removeClass('reviews__switcher-item--active')
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
    console.log(body.message) 
    successShow.open()
  }
    
})


// PLAYER

// let player;

// const playerContainer = $('.player')
// const playbackRange = document.querySelector('.player__playback-range')
// playbackRange.value = 0
// let intervalId

// const NORMAL_UPDATE_RANGE = 1000/66


// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('yt-player', {
//     height: '405',
//     width: '660',
//     videoId: 'hk7bPQJmC9w',
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     },
//     playerVars: {
//       controls: 0,
//       disablekb: 1,
//       showinfo: 0,
//       rel: 0,
//       autoplay: 0,
//       modestbranding: 0
//     }
//   });
// }

// function onPlayerReady () {
//   playbackRange.mix = 0
//   playbackRange.max = player.getDuration();

//   playbackRange.addEventListener('click', e => {
//     player.seekTo(e.target.value)
//   })

//   eventsInit();
// }

// function onPlayerStateChange() {
//   playbackRange.value = player.getCurrentTime();
//   console.log("refresh range");
// }



// let eventsInit = () => {
//   $(".player__start").click(e => {
//     e.preventDefault()
  
//     if (playerContainer.hasClass("paused")) {
//       playerContainer.removeClass("paused");

//       player.pauseVideo();
//       stopInterval()
//     } else {
//       playerContainer.addClass("paused");
//       intervalId = setInterval(onPlayerStateChange, NORMAL_UPDATE_RANGE)
//       player.playVideo();
//     }
//   })

  

//   function stopInterval() {
//     clearInterval(intervalId)
//     // if (player.pauseVideo) {
//     //   console.log('PAUSED');
//     // }
//   }

// }

// PLAYER

let player;

const playerContainer = $('.player')
const playbackRange = document.querySelector('.player__playback-range')
playbackRange.value = 0
let intervalId

const NORMAL_UPDATE_RANGE = 1000/66


function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '405',
    width: '660',
    videoId: 'hk7bPQJmC9w',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 1,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

function onPlayerReady () {
  playbackRange.mix = 0
  playbackRange.max = player.getDuration();
  playbackRange.addEventListener('mousedown', e => {
    stopInterval();
    player.pauseVideo();
  })
  playbackRange.addEventListener('mouseup', e => {
    player.seekTo(e.target.value);
    player.playVideo();
    intervalId = setInterval(upDateDuration, NORMAL_UPDATE_RANGE)
  })

  eventsInit();
}

function onPlayerStateChange(e) {
  console.log(e);
  const state = e.data;
  console.log(state);
  console.log("refresh range");
}

function upDateDuration(){
  playbackRange.value = player.getCurrentTime();
  console.log('UPDATE');
}

function stopInterval() {
  clearInterval(intervalId);
  console.log('STOP');
}


let eventsInit = () => {
  $(".player__start").click(e => {
    const state = player.getPlayerState();
    switch (state) {
      case 1:
        player.pauseVideo();
        break;
      case 2:
        player.playVideo();
        break;
      case 5:
        player.playVideo();
        break;
      case 0:
        player.playVideo();
        break;
      default:
        break;
    }
  })
}


// TEAM

const openItem = item => {
  const container = item.closest(".team__avatar")
  const contentBlock = container.find(".team__member-status")
  const textBlock = container.find(".team__member-block")
  const reqHeight = textBlock.height()

  container.addClass("team__avatar--active")
  contentBlock.height(reqHeight)
}

const closeEveryItem = container => {
  const items = container.find(".team__member-status")
  const itemsContainer = container.find(".team__avatar")
  
  itemsContainer.removeClass("team__avatar--active")
  items.height(0)
}

$('.team__member').click(e => {
  const $this = $(e.currentTarget)
  const container2 = $this.closest(".team__avatars")
  const elemContainer = $this.closest(".team__avatar")


  if (elemContainer.hasClass("team__avatar--active")) {
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



// products-menu-section 

const mesureWidth = item => {

  let reqItemWidth = 0
  const screenWidth = $(window).width()
  const container = item.closest('.products-menu')
  const titlesBlocks = container.find('.products-menu__title')
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length

  const textContainer = item.find('.products-menu__container')
  const paddingLeft = parseInt(textContainer.css('padding-left'))
  const paddingRight = parseInt(textContainer.css('padding-right'))

  const isMobile = window.matchMedia("(max-width: 768px)").matches

  if (isMobile) {
    reqItemWidth = screenWidth - titlesWidth
  } else {
    reqItemWidth = 500
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  }
}



const closeEveryItemContainer = container => {
  const items = container.find('.products-menu__item');
  const content = container.find('.products-menu__content');

  items.removeClass('active')
  content.width(0)
}

const openItemCont = item => {
  const hiddenContent = item.find('.products-menu__content')
  const reqWidth = mesureWidth(item)
  const textBlock = item.find('.products-menu__container')


  item.addClass('active')

  hiddenContent.width(reqWidth.container)
  textBlock.width(reqWidth.textContainer)

}

$('.products-menu__title').on('click', e => {
  e.preventDefault();

  const $this = $(e.currentTarget)
  const item = $this.closest('.products-menu__item')
  const itemOpened = item.hasClass('active')
  const container = $this.closest('.products-menu')

  if (itemOpened) {
    closeEveryItemContainer(container)
  } else {
    closeEveryItemContainer(container)
    openItemCont(item)
  }
})

$('.products-menu__close').on('click', e => {
  e.preventDefault()

  closeEveryItemContainer($('.products-menu'))

})










// OPS

const sections = $('section')
const display = $('.maincontent')

const mobileDetect = new MobileDetect(window.navigator.userAgent)
const isMobile = mobileDetect.mobile()


let inScroll = false

sections.first().addClass('active')

const performTransition = (sectionEq) => {

  if (inScroll === false) {
    inScroll = true
    const position = sectionEq * -100;

      const currentSection = sections.eq(sectionEq)
      const menuTheme = currentSection.attr('data-sidemenu-theme')
      const sideMenu = $('.fixed-menu')

      if (menuTheme === 'black') {

        sideMenu.addClass('fixed-menu--shadowed')

      } else {

        sideMenu.removeClass('fixed-menu--shadowed')
      }
    display.css({
      transform: `translateY(${position}%)`
    })
  
    sections.eq(sectionEq).addClass('active').siblings().removeClass('active')
  



  setTimeout(() => {
    inScroll = false 
        sideMenu
        .find('.fixed-menu__item')
        .eq(sectionEq)
        .addClass('fixed-menu__item--active')
        .siblings()
        .removeClass('fixed-menu__item--active')
  }, 1300)
}
}

const scrollViewport = direction => {

  const activeSection = sections.filter('.active')
  const nextSection = activeSection.next()
  const prevSection = activeSection.prev()

  if (direction === 'next' && nextSection.length) {
    performTransition(nextSection.index())
  }

  if (direction === 'prev' && prevSection.length) {
    performTransition(prevSection.index())
  }
}

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY

  if (deltaY > 0) {
    scrollViewport('next')
  }

  if (deltaY < 0) {
    scrollViewport('prev')
  }
})

$(window).on('keydown', e => {
  
  const tagName = e.target.tagName.toLowerCase()

  if(tagName !== 'input' && tagName !== 'textarea') {

    switch (e.keyCode) {

      case 38:
        scrollViewport('prev')
        break;
  
      case 40:
        scrollViewport('next')
        break;
    }
  }
})

$('.wrapper').on('touchmove', e => e.preventDefault())

$('[data-scroll-to]').click(e => {
e.preventDefault();

const $this = $(e.currentTarget)
const target = $this.attr('data-scroll-to')
reqSection = $(`[data-section-id=${target}]`)

performTransition(reqSection.index())

})

if (isMobile) {

$('body').swipe( {
  swipe:function(event, direction,) {
    const scroller = scrollViewport()
    let scrollDirection = '' 

    if (direction === 'up') scrollDirection = 'next'
    if (direction === 'down') scrollDirection = 'prev'
  
    scroller[scrollDirection]()
    }
  })
}
