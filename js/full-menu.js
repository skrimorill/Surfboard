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