// --- MENU HAMBURGER ---
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

// --- CÓPIA DE EMAIL ---
const emailBox = document.getElementById('copy-email');
const emailText = document.getElementById('email-text');
const copyMessage = document.getElementById('copy-message');

emailBox.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText.innerText).then(() => {
        copyMessage.classList.add('show');
        
        setTimeout(() => {
            copyMessage.classList.remove('show');
        }, 2500);
    });
});

// --- LÓGICA DE GALERIAS ---
const mainContent = document.getElementById('main-content');
const indoorGallery = document.getElementById('indoor-gallery');
const outdoorGallery = document.getElementById('outdoor-gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openGallery(type) {
    mainContent.classList.add('hidden');
    
    if (type === 'indoor') {
        indoorGallery.classList.remove('hidden');
    } else if (type === 'outdoor') {
        outdoorGallery.classList.remove('hidden');
    }
    
    window.scrollTo(0, 0);
}

function closeGallery() {
    indoorGallery.classList.add('hidden');
    outdoorGallery.classList.add('hidden');
    
    mainContent.classList.remove('hidden');
    
    document.getElementById('pictures').scrollIntoView({ behavior: 'smooth' });
}

// --- LÓGICA DO LIGHTBOX (Navegação) ---
let currentImages = []; 
let currentIndex = 0;   

function openLightbox(imgElement) {
    // 1. Identifica a galeria pai e todas as suas imagens
    const gallerySection = imgElement.closest('.gallery-page');
    currentImages = Array.from(gallerySection.querySelectorAll('img'));
    
    // 2. Encontra o índice da imagem clicada
    currentIndex = currentImages.indexOf(imgElement);
    
    // 3. Abre o lightbox com a imagem certa
    lightboxImg.src = imgElement.src;
    lightbox.classList.remove('hidden');
    
    // 4. Adiciona o listener para as setas do teclado
    document.addEventListener('keydown', handleKeyNavigation);
}

function changeImage(direction) {
    currentIndex += direction;

    // Loop infinito
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;

    lightboxImg.src = currentImages[currentIndex].src;
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImg.src = ''; 
    // Remove o listener para não gastar memória
    document.removeEventListener('keydown', handleKeyNavigation);
}

// Lógica das setas do teclado
function handleKeyNavigation(e) {
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'Escape') closeLightbox();
}

// Fecha apenas se clicar fora da imagem e fora das setas
lightbox.addEventListener('click', function(e) {
    // Se clicar no container (fundo preto), fecha. 
    // Se clicar na imagem ou nos botões, não faz nada.
    if (e.target === lightbox) {
        closeLightbox();
    }
});