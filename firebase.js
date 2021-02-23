import { initializeApp } from "firebase";

const config = {
  apiKey: "AIzaSyBcMlRvGeFQV5TwvuRQ3LmC1X5p7jgYEN0",
  authDomain: "agrohawk-system.firebaseapp.com",
  databaseURL: "https://agrohawk-system.firebaseio.com",
  projectId: "agrohawk-system",
  storageBucket: "agrohawk-system.appspot.com",
  messagingSenderId: "1077176651961",
  appId: "1:1077176651961:web:559e675c6ee009d4098b68",
  measurementId: "G-WFKZPB6631",
};

const sharedConfig = {
    apiKey: "AIzaSyC47If7TQS_n8y8lrr7BkPHYXCwFZ13VrI",
    authDomain: "agrohawk-68b5c.firebaseapp.com",
    databaseURL: "https://agrohawk-68b5c.firebaseio.com",
    storageBucket: "agrohawk-68b5c.appspot.com",
    messagingSenderId: "233414458883",
    projectId: "agrohawk-68b5c",
};

export const Firebase = initializeApp(config, "main");

export const shared = initializeApp(sharedConfig, "secondary");
export const sharedDb = shared.firestore();

