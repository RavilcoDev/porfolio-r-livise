
// firebase
import Contact from '../firebase/contacts/contacts.js'

import getToast from './getToast.js'

async function createContact () {

  const emailNode = document.querySelector("#email")
  const messageNode = document.querySelector("#message")
  const buttonNode = document.querySelector("#buttonContact")
  const Toast = getToast()

  try {

    const email = emailNode.value
    const message = messageNode.value

    if (!email || !message) {
      await Toast.fire({
        icon: 'warning',
        title: 'Falta agragar email o mensaje.'
      })
      return
    }
    if (!email.includes("@")) {
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
    buttonNode.textContent = "Enviando ..."

    emailNode.setAttribute("disabled", true)
    messageNode.setAttribute("disabled", true)

    const contactFirebase = new Contact();

    await contactFirebase
      .createContacts(contactSend)

    

  } catch (err) {
    console.error(new Error(err));
  } finally {
    emailNode.removeAttribute("disabled")
    messageNode.removeAttribute("disabled")
    emailNode.value = ""
    messageNode.value = ""
    buttonNode.textContent = "Enviar"

    await Toast.fire({
      icon: 'success',
      title: 'Mensaje enviado'
    })
  }
}

export default createContact