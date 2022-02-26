import appFirebase from '../general.js';
import {
  getFirestore,
  addDoc,
  collection,
  Timestamp,
  setLogLevel,
} from 'firebase/firestore';

class Contacts {
  constructor() {
    this.db = getFirestore(appFirebase);
  }
  async createContacts({ email, message }) {
    try {
      // setLogLevel('debug');

      await addDoc(collection(this.db, 'contacts'), {
        email,
        message,
        date: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error(new Error(error));
    }
  }
}

export default Contacts;
