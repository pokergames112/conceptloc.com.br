document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // LÓGICA DO CARROSSEL (Automático e Manual)
    // ==========================================
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.next');
        const prevButton = carousel.querySelector('.prev');
        
        let currentIndex = 0;
        let autoPlayInterval;

        // Função mais segura: pega a largura do próprio carrossel (pai)
        const updateCarousel = () => {
            const slideWidth = carousel.clientWidth;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        const moveToNextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        };

        const moveToPrevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        };

        // Eventos de clique nas setas (Manual)
        nextButton.addEventListener('click', () => {
            moveToNextSlide();
            resetAutoPlay();
        });

        prevButton.addEventListener('click', () => {
            moveToPrevSlide();
            resetAutoPlay();
        });

        // Autoplay - passa automático a cada 3 segundos
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(moveToNextSlide, 3000);
        };

        // Reinicia o tempo se o usuário clicar na seta manual
        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };

        // Ajusta o tamanho se virar a tela do celular ou redimensionar a janela
        window.addEventListener('resize', updateCarousel);

        // Dá o play inicial assim que a página abre
        startAutoPlay();
        
        // Garante o alinhamento na tela já no primeiro segundo
        updateCarousel();
    });

    // ==========================================
    // LÓGICA DA SETA VOLTAR AO TOPO
    // ==========================================
    const btnTop = document.getElementById('btnTop');
    
    // Verifica se o botão existe na página antes de aplicar a lógica
    if (btnTop) {
        // Mostra a seta só quando descer mais de 300 pixels
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnTop.style.display = 'block';
            } else {
                btnTop.style.display = 'none';
            }
        });

        // Quando clicar na seta, volta ao topo suavemente
        btnTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});