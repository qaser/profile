function scrollFade() {
    const texts = document.querySelectorAll('.skill-item__description');
    texts.forEach(text => {
         const textPosition = text.getBoundingClientRect().top;
         const windowHeight = window.innerHeight;
        if (textPosition < windowHeight / 3) {
            text.classList.add('skill-item__description_active');
        }
    })
}

window.addEventListener('scroll', scrollFade);
