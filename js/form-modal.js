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