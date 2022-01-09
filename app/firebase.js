import firebaseConfig from '../config';
import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: "*******",
	authDomain: "*******",
	projectId: "*******",
	storageBucket: "*******",
	messagingSenderId: "*******",
	appId: "*******",
	measurementId: "*******"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
