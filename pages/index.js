const texts = document.querySelectorAll('.skill-item__description');
const windowHeight = window.innerHeight;

function scrollFade() {
    texts.forEach(text => {
        const textPosition = text.getBoundingClientRect().top;
        if (textPosition < windowHeight / 1.5) {
            text.classList.add('skill-item__description_active');
        }
    })
}

window.addEventListener('scroll', scrollFade);
