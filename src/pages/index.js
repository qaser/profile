const firstString = document.querySelector('#first-string');
const secondString = document.querySelector('#second-string');
const hintString = document.querySelector('.console__hint');
const firstCursor = document.querySelector('#first-cursor');
const secondCursor = document.querySelector('#second-cursor');

const firstText = 'Hi,';
const secondText = "I'm qaser";
let originText = '';

const delay = 300;

const delayLoop = (fn, delay, data) => {
    return (x, i) => {
        setTimeout(() => {
        fn(x, data);
        }, i * delay);
    }
};

function setTextContent(char, data) {
    data.text = data.text + char;
    data.selector.textContent = data.text;
}


function startAnimation(text, delay, selector) {
    const arr = Array.from(text);
    let originText = '';
    const data = {
        selector: selector,
        text: originText
    }
    arr.forEach(delayLoop(setTextContent, delay, data))
}
