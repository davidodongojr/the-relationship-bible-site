// Cards pop up once as they scroll into view.
const popper = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in')
      popper.unobserve(entry.target)
    }
  }
}, { threshold: 0.15 })
document.querySelectorAll('.pop').forEach((el) => popper.observe(el))

// The screens rail can be dragged with a mouse as well as swiped.
const rail = document.querySelector('[data-rail]')
if (rail) {
  let startX = 0
  let startScroll = 0
  let dragging = false
  rail.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') return
    dragging = true
    startX = event.clientX
    startScroll = rail.scrollLeft
    rail.classList.add('dragging')
  })
  window.addEventListener('pointermove', (event) => {
    if (dragging) rail.scrollLeft = startScroll - (event.clientX - startX)
  })
  window.addEventListener('pointerup', () => {
    dragging = false
    rail.classList.remove('dragging')
  })
  rail.addEventListener('dragstart', (event) => event.preventDefault())
}
