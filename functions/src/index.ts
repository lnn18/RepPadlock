import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
//import { addListener } from 'process';
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();
const db = admin.firestore();
export const updateDate = functions.firestore.document("Registro/00ASmNYNOj20Xofu5jwO")
.onUpdate(change => {
    const after = change.after.data()
    const payload = {
        data: {
            estado: after.estado,
            modo: after.modo
        }
    }
    console.log('actualizado registro ',after)
    return admin.messaging().sendToTopic("estado_candado",payload)
    .catch(error => {
        console.error("FCM failed ", error);  
    })
})

export const createRegister = functions.firestore.document('Registro/{id}')
.onCreate(async (snap, context) =>{
    const data = snap.data();
    console.log('Nuevo registro 2 : ', data);
    //const regRef = db.doc(`Registro/${data.uid}`);
    const docId = context.params.id;
    console.log('Id documento : ', 'Registro/' + docId);
    const regRef = db.doc('Registro/' + docId);
    const regSnap = await regRef.get();
    console.log('Snap 2 data : ', regSnap);
    const date = Date.now();
    const date_us = Math.floor(date/1000);
    //const dateUTC = date.
    return regRef.update({
        ts_date: date_us
    })
})

export const getCandado = functions.https.onRequest((request, response) => {
 //response.send("Hello from Firebase!");
 admin.firestore().collection('Registro').doc('00ASmNYNOj20Xofu5jwO').get()
 .then(snapshot => {
     const data = snapshot.data();
     response.send(data);
 }
 )
 .catch(error => {
     console.log(error);
     response.status(500).send(error);
 })
});
