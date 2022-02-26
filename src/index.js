// Main
import Template from './templates/Template.js';

//css
import './styles/main.css'

//utils
import redirectButton from "./utils/redirectButton.js"
import createContact from './utils/createContact.js';
import getWorks from './utils/getWorks.js';

// import Contact from './firebase/contacts/contacts.js'




(function App () {
  const main = null || document.getElementById('app');
  main.innerHTML = Template();
  redirectButton(100);

  //call api for works
  getWorks();

  //addEvent contactos
  const buttonContact = document.querySelector("#buttonContact")
  buttonContact.addEventListener('click', createContact)

})();
