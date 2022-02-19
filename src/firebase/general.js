  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import firebaseConfig from  './config/ConfigFirebase.js'
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

export default app