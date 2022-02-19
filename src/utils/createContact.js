
// firebase
import Contact from '../firebase/contacts/contacts.js'

import getToast from './getToast.js'

async function  createContact() {
    await setTimeout(1000)


    const email=document.querySelector("#email").value
    const message=document.querySelector("#message").value
    const Toast = getToast()
    if (!email || !message){
      await Toast.fire({
        icon: 'warning',
        title: 'Falta agragar email o mensaje.'
      })
      return
    }
    if(!email.includes("@") ){
      await Toast.fire({
        icon: 'warning',
        title: 'Ingresa un email correcto (@).'
      })
      return
    }
    const contactSend = {
      email,
      message,
    };
    const contactFirebase = new Contact();
  
    contactFirebase
      .createContacts(contactSend)
      .then(() => {
        alert("enviado200")
  
        Toast.fire({
          icon: 'success',
          title: 'Mensaje enviado'
        })
      })
      .catch((err) => {
        console.error(new Error(err));
      });
  }

  export default createContact