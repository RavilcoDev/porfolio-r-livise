// Main
import Template from './templates/Template.js';
import './styles/main.css';

//css
import './styles/main.css'

//utils
import redirectButton from "./utils/redirectButton.js"
import createContact from './utils/createContact.js';
import getWorks from './utils/getWorks.js';



(async function App () {
  const main = null || document.getElementById('app');
  main.innerHTML = await Template();
  redirectButton(100);

  //call api for works
  getWorks();

  //addEvent contactos
  const buttonContact =document.querySelector("button.contact__button")
      if(buttonContact){
        buttonContact.addEventListener('click',createContact)
      }
})();




