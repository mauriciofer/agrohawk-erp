const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
    apiKey: "AIzaSyBcMlRvGeFQV5TwvuRQ3LmC1X5p7jgYEN0",
    authDomain: "agrohawk-system.firebaseapp.com",
    databaseURL: "https://agrohawk-system.firebaseio.com",
    projectId: "agrohawk-system",
    storageBucket: "agrohawk-system.appspot.com",
    messagingSenderId: "1077176651961",
    appId: "1:1077176651961:web:559e675c6ee009d4098b68",
    measurementId: "G-WFKZPB6631"
});

var db = firebase.firestore();

// const provincias = require("./provincias.json");
// Object.keys(provincias).forEach(function (key) {
//     db.collection("provincias").add({
//         id: key,
//         name: provincias[key].Nombre
//     }).then(function (docRef) {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function (error) {
//         console.error("Error adding document: ", error);
//     });
// });

// const cantones = require("./cantones.json");
// Object.keys(cantones).forEach(function (key) {
//     db.collection("cantones").add({
//         id: key,
//         provincia: cantones[key].Provincia,
//         name: cantones[key].Nombre,
//         area: cantones[key]["Área (km2)"],
//         population: cantones[key]["Pop. (2008)"]
//     }).then(function (docRef) {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function (error) {
//         console.error("Error adding document: ", error);
//     });
// })

// const distritos = require("./distritos.json");
// Object.keys(distritos).forEach(function (key) {
//     db.collection("distritos").add({
//         id: key,
//         canton: distritos[key]["Cantón"],
//         name: distritos[key].Nombre
//     }).then(function (docRef) {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function (error) {
//         console.error("Error adding document: ", error);
//     });
// })