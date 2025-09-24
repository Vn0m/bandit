const renderBands = async () => {
    const response = await fetch('/bands')
    const bandsData = await response.json()

    const mainContent = document.getElementById('main-content')
    if (bandsData) {
        const bandsContainer = document.createElement('div')
        bandsContainer.className = 'grid'
        bandsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)'
        
        bandsData.map(band => {
            const bandCard = document.createElement('article')
            
            const bandImage = document.createElement('img')
            bandImage.src = band.image
            bandImage.alt = band.name
            bandImage.style.width = '100%'
            bandImage.style.height = '300px'
            bandImage.style.objectFit = 'cover'
            
            const bandName = document.createElement('h3')
            bandName.textContent = band.name
            
            const bandOrigin = document.createElement('p')
            bandOrigin.textContent = `${band.origin} • ${band.formed}`
            
            const bandGenre = document.createElement('kbd')
            bandGenre.textContent = band.genre
            
            const bandDescription = document.createElement('p')
            bandDescription.textContent = band.description
            
            bandCard.appendChild(bandImage)
            bandCard.appendChild(bandName)
            bandCard.appendChild(bandOrigin)
            bandCard.appendChild(bandGenre)
            bandCard.appendChild(bandDescription)
            
            bandCard.addEventListener('click', function handleClick(event) {
                window.location = `/bands/${band.id}`
            })
            
            bandsContainer.appendChild(bandCard)
        })
        
        mainContent.appendChild(bandsContainer)
    } else {
        const noDataMessage = document.createElement('h2')
        noDataMessage.textContent = 'No bands available'
        mainContent.appendChild(noDataMessage)
    }
}

const renderBand = async () => {
    const requestedID = window.location.pathname.split('/').pop()
    
    const response = await fetch('/bands')
    const bandsData = await response.json()
    
    const bandContent = document.getElementById('band-content')
    
    let band
    
    if (bandsData) {
        band = bandsData.find(band => band.id === requestedID)
    }
    
    if (band) {
        document.getElementById('image').src = band.image
        document.getElementById('name').textContent = band.name
        document.getElementById('origin').textContent = `${band.origin} • Formed: ${band.formed}`
        document.getElementById('genre').textContent = band.genre
        document.getElementById('description').textContent = band.longDescription || band.description
        
        const membersElement = document.getElementById('members')
        membersElement.textContent = `Members: ${band.members.join(', ')}`
        
        document.title = `${band.name} - Bandit`
    } else {
        const bandContent = document.getElementById('band-content')
        bandContent.innerHTML = '<h2>No band details available </h2>'
    }
}

if (document.getElementById('main-content')) {
    renderBands()
}

if (document.getElementById('band-content')) {
    renderBand()
}
