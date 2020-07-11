// ES6 Class

class TypeWriter{
    constructor(txtElement, words, wait = 3000){
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type(){
        // Current index of arrey
        const current = this.wordIndex % this.words.length;
        // Get full text of current txtElement
        const fullTxt = this.words[current];

        // Check if isDeleting
        if (this.isDeleting){
            // Remove character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        }else{
            //Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Inserting into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial speed
        let speedInit = 300;

        if(this.isDeleting){
            speedInit /= 2;
        }

        // If word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            //Make pause at end of word
            speedInit = this.wait;
            // Set delete to true
            this.isDeleting = true;
       } else if (this.isDeleting && this.txt === ''){
           this.isDeleting = false;
           // Move to next word
           this.wordIndex++;
           // Pause before type new word
           speedInit = 500;
       }

       setTimeout(() => this.type(), speedInit);
    }
}

document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function(){
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const sliderObjects = document.querySelectorAll('.slide-in');
function checkSlide(e){
    sliderObjects.forEach(sliderObject => {
        // Middle point of the object height
        const slideInAt = (window.scrollY + window.innerHeight) -
        sliderObject.clientHeight / 2;
        // Bottom border point of object height
        const objectBottom = sliderObject.offsetTop + sliderObject.clientHeight;

        const isHalfShown = slideInAt > sliderObject.offsetTop;
        const isNotScrolledPast = window.scrollY < objectBottom;
        if(isHalfShown && isNotScrolledPast) {
            sliderObject.classList.add('slide-in-active');
        } else {
            sliderObject.classList.remove('slide-in-active');
        }
    });
}

window.addEventListener('scroll', debounce(checkSlide, 40));


