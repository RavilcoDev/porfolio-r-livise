class WorkPreview extends HTMLElement {
    constructor() {
        super();

    }
    /**
      * Inizializate the render()
      */
    connectedCallback () {
        this.render();
    }
    static get observedAttributes () {
        return ['image-src', 'description', 'hiperlinks'];
    }

    attributeChangedCallback (attr, oldVal, newVal) {
        switch (attr) {
            case 'image-src':
                this.imageSrc = newVal;
                break;
            case 'title':
                this.title = newVal;
                break;
            case 'description':
                this.description = newVal;
                break;
            case 'hiperlinks':
                this.hiperlinks = newVal;
                break;

        }
    }
    getHiperlinkTemplate (hiperlinks) {
        const links = JSON.parse(hiperlinks)
        return links.map((link) => {
            return/* vue-html*/`
            <div >
                <a href="${link.url}"><span><i class="${link.icon}"></i></span></a>
            </div>
        `
        })
            .reduce((acc, str) => acc + str, "")
    }

    getTemplate () {
        const template = document.createElement('template');
        template.innerHTML = /* vue-html */`
    <div class="work-card__container">
    <img src="${this.imageSrc}" alt="">
    <div class="work-card__detail">
        <h3 class="work-card__title">${this.title}</h3>
        <p class="work-card__description">${this.description}</p>
        <div class="work-card__buttons" >
            ${this.getHiperlinkTemplate(this.hiperlinks)}
        </div>
    </div>
    </div>
    <style>${this.getStyle()}</style>`
        return template
    }

    getStyle(){
        return `
          .work-card__container {
            position: relative;
            border: solid 2px;
            margin: auto;
            width: 25vw;
            height: calc(25vw / 2);
            background-color: #fff;
            overflow: hidden;
            cursor: pointer;
            transition: 400ms;
            transform-origin: center left;
            z-index: 0;
          }
          .work-card__container:hover {
            width: 30vw;
            height: 15vw;
          }
          .work-card__container > img {
            width: 100%;
            object-fit: cover;
          }
          .work-card__detail {
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.9) 0%,
              rgba(0, 0, 0, 0) 100%
            );
            font-size: 16px;
            color: var(--color-font-light);
            transition: 450ms;
            padding: 15px 20px;
            position: absolute;
            opacity: 0;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
          }
          .work-card__detail:hover {
            opacity: 1;
          }
          .work-card__title {
            margin-bottom: 0px;
          }
          .work-card__description {
            margin-top: 2px;
            margin-bottom: 10px;
          }
          .work-card__buttons {
            display: flex;
            flex-direction: row;
          }
          .work-card__buttons a {
            color: var(--color-font-light);
            font-size: 2em;
            margin-right: 0.3em;
          }

          @media screen and (max-width: 1024px) {
            .work-card__container {
              width: 36vw;
              height: 18vw;
            }
            .work-card__container:hover {
              width: 45vw;
              height: 22.5vw;
            }
          }
          @media screen and (max-width: 768px) {
            .work-card__container {
              width: 76vw;
              height: 38vw;
            }
            .work-card__container:hover {
              width: 90vw;
              height: 45vw;
            }
          }
          `
    }

    render () {
        //Use shadow DOM
        this.appendChild(
            this.getTemplate().content.cloneNode(true)
        );
    }
}

export default WorkPreview