class NavbarOption extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });//initialization shadow DOM
    this.validation = this.validation.bind(this);
    this.activeMenu = this.activeMenu.bind(this);
    this.getSlotOptions = this.getSlotOptions.bind(this);
    this.sizeChange = '480px';
  }

  /**
   * Inizializate the render()
   */
   connectedCallback() {
    this.render();

    this.menu = this.shadowRoot.querySelector('#content-menu');
    this.logo = this.shadowRoot.querySelector('#logo');

    this.visualizarPantalla();
    this.menu.addEventListener('click', this.resaltarBotom);
  }

  static get observedAttributes() {
    return ['size-change', 'items-option', 'imagen'];
  }
  
  attributeChangedCallback(attr, oldVal, newVal) {
    switch (attr) {
      case 'size-change':
        this.sizeChange = newVal;
        break;
      case 'items-option':
        this.itemsOption = newVal;
        break;
      case 'imagen':
        this.imagen = newVal;
        break;
    }
  }

  getSlotOptions() {
    let items = '';
    for (let index = 1; index <= this.itemsOption; index++) {
      items += `<slot name="option-${index}"></slot>`;
    }
    return items;
  }
  getTemplate() {
    const template = document.createElement('template');

    template.innerHTML = /* vue-html */`
        <header>
            <slot name="logo" id="logo"></slot>
            <slot name="title"></slot>
            <ul class="header__container--nav" id="content-menu">
                ${this.getSlotOptions()}
            </ul>
            </div>
        </header>

        <style>${this.getStyle()}</style>
        `;
    return template;
  }
  getStyle() {
    return `
        :host{
          --color-menu: #000;
          --color-principal-1: #fff;
          --color-principal-2: #aaa;
          --color-secundario-1: #099;
          --color-secundario-2: #990;
          --color-secundario-3: #909;
          --color-font-light: #bbb;
          --color-font-dark: #222;
          --logo-font-size: 60px;
          --title-font-size: 40px;
          --option-font-size: 25px;
            display:block;
            margin: 0px;
        }

        header {
            display: flex;
            justify-content: space-between;
            background-color: var(--color-menu);
            height: 100px;
            top: 0px;
            z-index: 5000;
            font-size: 50px;
        }

        ::slotted([slot=logo]) {
            display: none;
        }

        ::slotted([slot=title])  {
            font-family: 'Kalam', cursive;
            font-size: var(--title-font-size);
            margin-left: var(--title-font-size);
            padding: 0px;
            text-align: center;
            color: var(--color-font-light);
            display: flex;
            align-items: center;

        }


        .header__container--nav {
            font-size: 1em;
            margin: 0px;
            margin-right: 30px;
            padding: 0px;
            list-style: none;
            display: flex;
            align-items: center;
            height: 100%;

        }

        ::slotted(li) {
            font-size: var(--option-font-size);
            margin: 0.7em 0.5em;
            color: var(--color-secundario-1);
            font-weight: bold;
            height: calc(100% - 30px);
            display: flex;
            align-items: center;
            width: 100%;
        }

        ::slotted(.resalta) {
          color: var(--color-secundario-3);
        }
        

    @media screen and (max-width: ${this.sizeChange}) {

        /*js*/
        ::slotted(.resalta) {
          font-size: calc(var(--option-font-size) + 5px)
        }

        ::slotted([slot=logo]) {
            display: flex;
            justify-content:center;
            align-items: center;
            position: fixed;
            z-index: 3;
            bottom: calc(50px - 0.5em);
            height: 2em;
            width: 2em;
            background: var(--color-menu);
            border-radius: 1em;
            color: var(--color-font-light);
            font-size: var(--logo-font-size);
            transition-property: height var(--color-font-light) bottom;
            transition-duration: 0.5s;
            opacity: 0.5;

        }

        ::slotted([slot=logo]:hover) {
          opacity: 1;
        }

        .active::slotted([slot=logo]){
            font-size: calc(var(--logo-font-size) * 3 / 4);
            opacity: 1;
        }

        header {
            justify-content: center;
            height: 70px;
        }

        .header__container--nav.active {
            height: ${this.itemsOption*1.5}em;
            width: 90%;
            overflow: hidden;
            bottom: calc(50px + 0.5em);
            margin: 0px;
            padding-bottom: 0.5em;
            opacity: 1;
        }

        .header__container--nav {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            bottom: var(--logo-font-size);;
            position: fixed;
            height: 1em;
            width: 1em;
            margin: 0px;
            background: var(--color-menu);
            opacity: 0;

            transition-property: height color bottom;
            transition-duration: 0.5s;
        }

        ::slotted([slot=title]){
            margin:0px
        }

        ::slotted(li) {
            text-align: center;
            margin-right: 0px;
            height: 2em;
            transition: 0.3s;
        }
        ::slotted(:hover) {
          background-color: #158;

        }

        ::slotted(.resalta) {
          text-align: center;

            display: inline-block;
            margin-right: 0.25em;
        }
        `;
  }

  render() {
    //Use shadow DOM
    this.shadowRoot.appendChild(
      this.getTemplate().content.cloneNode(true)
    );
  }

  visualizarPantalla() {
    const viewIpad = window.matchMedia(
      `screen and (max-width: ${this.sizeChange})`
    );

    viewIpad.addEventListener("change",this.validation);
    this.validation(viewIpad);
  }

  validation(ev) {
    if (ev.matches) {
      this.logo.addEventListener('click', this.activeMenu);
    } else {
      this.logo.removeEventListener('click', this.activeMenu);
    }
  }

  activeMenu() {
    this.menu.classList.toggle('active');
    this.logo.classList.toggle('active');
  }

  resaltarBotom(event) {
    //event delegation
    const mainNode = event.path.filter(({nodeName})=>nodeName=="LI")
    if(Array.isArray(mainNode)&&mainNode.length>0){
      const parent = mainNode[0].parentNode;
      const options = [...parent.querySelectorAll('li')];
      options.forEach(option => {
        option.classList.remove('resalta');
      });

      mainNode[0].classList.add('resalta');
    }
  }
}
export default NavbarOption
