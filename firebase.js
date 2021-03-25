import * as firebase from 'firebase';
import Constants from 'expo-constants';



// Initialize Firebase with your own config parameters 
  const firebaseConfig = Constants.manifest.extra.firebaseConfig;
  
    export default firebase.initializeApp(firebaseConfig);