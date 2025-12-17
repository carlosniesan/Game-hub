// Theme Toggle
const themeBtn = document.getElementById('themeBtn');
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on load
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add animation effect
    themeBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeBtn.style.transform = 'rotate(0deg)';
    }, 300);
});

function updateThemeIcon(theme) {
    const icon = themeBtn.querySelector('.icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌓';
}

// Info Modal
const infoBtn = document.getElementById('infoBtn');
const infoModal = document.getElementById('infoModal');
const closeInfoBtn = document.getElementById('closeInfoBtn');

infoBtn.addEventListener('click', () => {
    infoModal.classList.add('active');
});

closeInfoBtn.addEventListener('click', () => {
    infoModal.classList.remove('active');
});

// Close modal when clicking outside
infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) {
        infoModal.classList.remove('active');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && infoModal.classList.contains('active')) {
        infoModal.classList.remove('active');
    }
});

// Game Cards Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize cards with animation
const gameCards = document.querySelectorAll('.game-card');
gameCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

const buttons = document.querySelectorAll('.btn-play');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-play {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Game counter
const gameCount = document.querySelectorAll('.game-card').length;
console.log(`🎮 ${gameCount} juegos cargados en el hub`);

// Add floating animation to game icons
gameCards.forEach((card, index) => {
    const icon = card.querySelector('.game-icon');
    if (icon) {
        icon.style.animationDelay = `${index * 0.2}s`;
    }
});

// Prevent links from opening in same window
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add a small delay for visual feedback
        const card = link.closest('.game-card');
        if (card) {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 100);
        }
    });
});

// Add statistics
const stats = {
    puzzleGames: document.querySelectorAll('[data-category="puzzle"]').length,
    speedGames: document.querySelectorAll('[data-category="speed"]').length,
    totalGames: gameCount
};

console.log('📊 Estadísticas del Hub:', stats);

// Welcome message
console.log('%c🎮 Game Hub cargado correctamente', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%c¡Bienvenido! Explora los juegos disponibles.', 'color: #764ba2; font-size: 14px;');
