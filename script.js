// Zadanie nr. 1
class View {
    constructor(element, template) {
        this.element = element;
        this.template = template;

        this.render();
    }
  
    render() {
        const template = this.template.innerHTML;
        const parsedTemplate = template.replace(/{{{(([0-9+\-\*\/]|\s)*)}}}/g, (match, token) => {
          const mathResult = new Function(`return${token}`);
          return mathResult();
        });
        this.element.innerHTML = parsedTemplate;
    }
  
    refresh() {
        this.render();
    }
}

const resultElement = document.querySelector('#results');
const exampleTemplate = document.querySelector('#example-template');
const Results = new View(resultElement, exampleTemplate);

// Zadanie nr. 2

class CarouselView {
    constructor(element) {
        this.element = element;
        this.currentSlide = 0;
        this.slideList = this.element.querySelectorAll('#slide');
        this.lastIndex = this.slideList.length - 1;
        this.slideBefore = this.lastIndex;
        this.timer;
        this.chevronLeft = this.element.querySelector('#slide-left');
        this.chevronRigth = this.element.querySelector('#slide-right');
        
        this.chevronLeft.addEventListener('click', this.slideLeft);
        this.chevronRigth.addEventListener('click', this.slideRight);
        this.element.addEventListener('mouseenter', this.onMouseEnter);
        this.element.addEventListener('mouseleave', this.onMouseLeave);
    }

    interval = () => {
        this.timer = setInterval(this.slideRight, 3000);
    }

    slideLeft = () => {
        this.slideBefore = this.currentSlide;
        this.currentSlide = this.currentSlide - 1;
        if(this.currentSlide < 0) {
            this.currentSlide = this.lastIndex;
            this.slideBefore = 0;
        }
        const slideWidth = 100 * this.currentSlide;
        this.slideList[this.currentSlide].style.transform = `translateX(${slideWidth}%)`;
        this.slideList[this.slideBefore].style.transform = 'translateX(0)';
    }

    slideRight = () => {
        this.slideBefore = this.currentSlide;
        this.currentSlide = this.currentSlide + 1;
        if(this.currentSlide > this.lastIndex) {
            this.currentSlide = 0;
            this.slideBefore = this.lastIndex;
        }
        this.transform('-');
    }

    onMouseEnter = () => {
        clearInterval(this.timer);
    }

    onMouseLeave = () => {
        this.interval();
    }

    transform = (mod) => {
        const slideWidth = 100 * this.currentSlide;
        this.slideList[this.currentSlide].style.transform = `translateX(${mod}${slideWidth}%)`;
        this.slideList[this.slideBefore].style.transform = 'translateX(0)';
    }
}

const carouselElement = document.querySelector('#carousel');
const Carousel = new CarouselView(carouselElement);
