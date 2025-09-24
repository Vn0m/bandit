const header = document.querySelector('header')
header.className = 'container' 

const headerContainer = document.createElement('div')
headerContainer.className = 'grid' 

const headerLeft = document.createElement('div')
headerLeft.className = 'header-left'
const headerLogo = document.createElement('img')
headerLogo.src = '/public/logo.png'
headerLogo.style.height = '70px' 
const headerTitle = document.createElement('h1')
headerTitle.textContent = 'Bandit'

headerLeft.appendChild(headerLogo)
headerLeft.appendChild(headerTitle)

const headerRight = document.createElement('div')
headerRight.className = 'header-right'
const homeButton = document.createElement('button')
homeButton.textContent = 'Home'
homeButton.className = 'outline'

homeButton.addEventListener('click', function handleClick(event) {
    window.location = '/'
})

headerRight.appendChild(homeButton)
headerContainer.appendChild(headerLeft)
headerContainer.appendChild(headerRight)
header.appendChild(headerContainer)