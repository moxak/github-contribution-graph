function hideTooltip() {
  if (currentTooltip) {
    currentTooltip.hidden = true
  }
}

function showTooltip(el) {
  hideTooltip()

  // const date = utcDate(el.getAttribute('data-date'))
  const date = new Date(el.getAttribute('data-date'))
  const count = parseInt(el.getAttribute('data-count') || '')

  const formatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date)
  const label = count === 0 ? 'No' : new Intl.NumberFormat('en-US').format(count)

  const strong = document.createElement('strong')
  strong.textContent = `${label} ${count === 1 ? 'contribution' : 'contributions'}`

  currentTooltip.innerHTML = ''
  currentTooltip.append(strong, ` on ${formatted}`)

  // We have to show the tooltip before calculating it's position.
  currentTooltip.hidden = false

  const bounds = el.getBoundingClientRect()
  const x = bounds.left + window.pageXOffset - currentTooltip.offsetWidth / 2 + bounds.width / 2
  const y = bounds.bottom + window.pageYOffset - currentTooltip.offsetHeight - bounds.height * 2
  const graphContainer = document.querySelector('.js-calendar-graph')
  const graphContainerBounds = graphContainer.getBoundingClientRect()
  currentTooltip.style.top = `${y}px`

  if (isTooFarLeft(graphContainerBounds, x)) {
    currentTooltip.style.left = `${southwestTooltip(bounds)}px`
    currentTooltip.classList.add('left')
    currentTooltip.classList.remove('right')
  } else if (isTooFarRight(graphContainerBounds, x)) {
    currentTooltip.style.left = `${southeastTooltip(bounds)}px`
    currentTooltip.classList.add('right')
    currentTooltip.classList.remove('left')
  } else {
    currentTooltip.style.left = `${x}px`
    currentTooltip.classList.remove('left')
    currentTooltip.classList.remove('right')
  }
}

function isTooFarLeft(graphContainerBounds, tooltipX) {
  return graphContainerBounds.x > tooltipX
}

function isTooFarRight(graphContainerBounds, tooltipX) {
  return graphContainerBounds.x + graphContainerBounds.width < tooltipX + currentTooltip.offsetWidth
}

function southwestTooltip(bounds) {
  return bounds.left + window.pageXOffset - currentTooltip.offsetWidth * 0.1 + bounds.width / 2
}

function southeastTooltip(bounds) {
  return bounds.left + window.pageXOffset - currentTooltip.offsetWidth * 0.9 + bounds.width / 2
}

const currentTooltip = document.createElement('div')
currentTooltip.classList.add('svg-tip', 'svg-tip-one-line')
// Remove pointer events to prevent tooltip flickering
currentTooltip.style.pointerEvents = 'none'
currentTooltip.hidden = true

// Add the tooltip to
document.body.appendChild(currentTooltip)

const el = document.getElementsByClassName('js-calendar-graph-svg')[0];
const container = document.getElementsByClassName('js-calendar-graph')[0];
container.addEventListener('mouseover', function (event) {
  const target = event.target
  if (target.matches('rect[data-count]')) {
    showTooltip(target)
  }
})
container.addEventListener('mouseout', hideTooltip)
const fromStr = container.getAttribute('data-from')
if (fromStr) {
  // previousDay = utcDate(fromStr)
  previousDay = new Date(fromStr)
}