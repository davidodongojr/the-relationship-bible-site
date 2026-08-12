const navToggle = document.querySelector('.nav-toggle')
const mainNav = document.querySelector('#main-nav')

function closeNavigation() {
  if (!navToggle || !mainNav) return
  navToggle.setAttribute('aria-expanded', 'false')
  navToggle.setAttribute('aria-label', 'Open navigation')
  mainNav.classList.remove('open')
  document.body.classList.remove('menu-open')
}

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true'
  navToggle.setAttribute('aria-expanded', String(!isOpen))
  navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation')
  mainNav?.classList.toggle('open', !isOpen)
  document.body.classList.toggle('menu-open', !isOpen)
})

mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation))

const featureTabs = [...document.querySelectorAll('.feature-tab')]
const productPanels = [...document.querySelectorAll('.product-panel')]

function selectProductPanel(target) {
  featureTabs.forEach((tab) => {
    const isSelected = tab.dataset.target === target
    tab.classList.toggle('active', isSelected)
    tab.setAttribute('aria-selected', String(isSelected))
    tab.tabIndex = isSelected ? 0 : -1
  })

  productPanels.forEach((panel) => {
    const isSelected = panel.dataset.panel === target
    panel.hidden = !isSelected
    panel.classList.toggle('active', isSelected)
  })
}

featureTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectProductPanel(tab.dataset.target))
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()

    let nextIndex = index
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % featureTabs.length
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + featureTabs.length) % featureTabs.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = featureTabs.length - 1

    const nextTab = featureTabs[nextIndex]
    selectProductPanel(nextTab.dataset.target)
    nextTab.focus()
  })
})
