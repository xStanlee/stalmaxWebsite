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