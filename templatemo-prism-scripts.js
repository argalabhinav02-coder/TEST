// Abhinav Memories - Carousel Only

// Picture data for carousel
const portfolioData = [
    {
        id: 1,
        title: 'Youngest Pic of Mine',
        description: 'When I Go First Time At School. This Is The FIrst Picture I Clicked',
        image: 'images/neural-network.jpg'
    },
    {
        id: 2,
        title: 'The Cutest Pic of Mine',
        description: 'This Is a Photo When I Go To An Restaurent.',
        image: 'images/quantum-cloud.jpg'
    },
    {
        id: 3,
        title: 'Orchha Fort',
        description: 'This is the Same Fort Which is Shooted in a Bollywood Movie, Bhool Bhuliayaa 3.',
        image: 'images/blockchain-vault.jpg'
    },
    {
        id: 4,
        title: 'A Beautiful Sunset',
        description: 'A Beautiful Sunset at my Village.',
        image: 'images/cyber-defense.jpg'
    },
    {
        id: 5,
        title: 'Pic of My Younger Brother',
        description: 'Also a Beautiful Picture at my Village.',
        image: 'images/data-nexus.jpg'
    },
    {
        id: 6,
        title: 'New Shirt Birthday Pic',
        description: 'Because there was my Birthday so I Brought a New Shirt And Then Clicked This Photo.',
        image: 'images/ar-interface.jpg'
    },
    {
        id: 7,
        title: 'Tremendous Picture at Jabalpur',
        description: 'This is a Picture I Clicked At Jabalpur, The Valley is really So Deep.',
        image: 'images/iot-matrix.jpg'
    }
];

// === Carousel Logic ===
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index;

    item.innerHTML = `
        <div class="card">
            <div class="card-number">0${data.id}</div>
            <div class="card-image">
                <img src="${data.image}" alt="${data.title}">
            </div>
            <h3 class="card-title">${data.title}</h3>
            <p class="card-description">${data.description}</p>
        </div>
    `;

    return item;
}

function initCarousel() {
    portfolioData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);

        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const totalItems = items.length;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    items.forEach((item, index) => {
        let offset = index - currentIndex;
        if (offset > totalItems / 2) offset -= totalItems;
        else if (offset < -totalItems / 2) offset += totalItems;

        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        let spacing1 = 400, spacing2 = 600, spacing3 = 750;
        if (isMobile) {
            spacing1 = 280; spacing2 = 420; spacing3 = 550;
        } else if (isTablet) {
            spacing1 = 340; spacing2 = 520; spacing3 = 650;
        }

        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
        if (absOffset === 0) {
            item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
        } else if (absOffset === 1) {
            const translateX = sign * spacing1;
            const rotation = isMobile ? 25 : 30;
            const scale = isMobile ? 0.88 : 0.85;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.8';
            item.style.zIndex = '5';
        } else if (absOffset === 2) {
            const translateX = sign * spacing2;
            const rotation = isMobile ? 35 : 40;
            const scale = isMobile ? 0.75 : 0.7;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.5';
            item.style.zIndex = '3';
        } else if (absOffset === 3) {
            const translateX = sign * spacing3;
            const rotation = isMobile ? 40 : 45;
            const scale = isMobile ? 0.65 : 0.6;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.3';
            item.style.zIndex = '2';
        } else {
            item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
            item.style.opacity = '0';
            item.style.zIndex = '1';
        }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % portfolioData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Event Listeners
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Auto-rotate every 5 seconds
setInterval(nextSlide, 5000);

// Recalculate layout on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => updateCarousel(), 250);
});

// Initialize carousel on load
window.addEventListener('load', initCarousel);
