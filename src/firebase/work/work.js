import '../general.js'
import { getFirestore, collection, getDocs, setLogLevel } from "firebase/firestore"

class Work {
    constructor() {
        this.db = getFirestore();
    }
    async listWorks () {
        try {
            // setLogLevel('debug')

            const querySnapshot = await getDocs(collection(this.db, "works"));

            const result = querySnapshot.docs.map((doc) => {
                return doc.data()
            });
            return result
        } catch (error) {
            console.error(new Error(error))
        }

    }
}

export default Work