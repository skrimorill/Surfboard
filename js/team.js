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