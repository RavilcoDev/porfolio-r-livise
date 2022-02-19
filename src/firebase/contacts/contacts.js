import appFirebase from '../general.js';
import {
  getFirestore,
  setDoc,
  doc,
  Timestamp,
  setLogLevel
} from "firebase/firestore";

class Contacts {
  constructor() {
    this.db = getFirestore(appFirebase);
  }
  async createContacts({ email, message }) {
     try {
  // setLogLevel('debug')


    await setDoc(doc(this.db, 'contacts',"adsasdd"), {
        email,
        message,
        date: Timestamp.fromDate(new Date()),
      })

     } catch (error) {
       console.error(new Error(error))
     }
      
  }
}

export default Contacts;
