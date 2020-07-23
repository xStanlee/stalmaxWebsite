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

/*Popup gallery*/
/*Popup gallery*/
/*Popup gallery*/

const gallery = document.querySelector('.popup__gallery');
const showGallery = document.querySelector('#show-gallery');
const closeGallery = document.querySelector('.popup__gallery--close-container');
let clickedGallery = false;

 [showGallery, closeGallery].forEach(el => el.addEventListener('click', () => {
    if (clickedGallery === false) {
        gallery.style.opacity = 1;
        gallery.classList.add('popup__gallery--active');
        document.querySelector('.logo').style.display = 'none';                      // Little-cheat form low resolutions
        clickedGallery = true;
    } else {
        gallery.style.opacity = 0;
        gallery.classList.remove('popup__gallery--active');
        document.querySelector('.logo').style.display = 'none';                     // Little-cheat form low resolutions
        clickedGallery = false;
    }
}));


const current = document.querySelector('#current');
const imgs = document.querySelectorAll('.popup__gallery--images img');
const opacity = 0.8;


imgs.forEach(img => img.addEventListener('click', imgClick));

function imgClick(e) {
    // Reset opacity of small images
    imgs.forEach(img => (img.style.opacity = 1));

    // Change src of main img
    current.src = e.target.src;

    // Add fade-in effect to main photo
    current.classList.add('fade-in');

    // Remove fade-in effect
    setTimeout(() => current.classList.remove('fade-in'),500);

    // Change opacity of selected photo (mini)
    e.target.style.opacity = opacity;
}

// Sw(eet)al(ert) Pop-up after message sent

let infoMess = document.querySelector('.email-send');
if( infoMess.textContent !== ""){
    infoMess.textContent == "success" ? swal("Wysłano!", "Twoja wiadomość została wysłana.", infoMess.textContent) : swal("Bład!", "Wystąpił problem z wysłaniem wiadomości. Spróbój ponownie.", "error");
}

// For responsive phones message display

const links = document.querySelectorAll(".navigation__link");
let confirmation = true;
function hideAndShow(e) {
    if (pageYOffset > 4100){
        links.forEach(link => {
            link.style.display = "none";
        });
    }else {
        links.forEach(link => {
            link.style.display = "inline-block";
        });
    }
}
if (window.innerWidth < 1080){
    window.addEventListener('scroll', debounce(hideAndShow, 100));
}