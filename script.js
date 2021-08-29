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

