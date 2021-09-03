const functions = require("firebase-functions");
const Filter = require('bad-words');

const admin = require('firebase-admin');
admin.initializeApp();

const authorities = admin.firestore();

exports.detectFoulMuggles = functions.firestore
    .document('messages/{msgId}')
    .onCreate(async(doc, ctx) => {

        const filter = new Filter();
        const { text, uid } = doc.data();

        if (filter.isProfane(text)){
            const cleaned = filter.clean(text);
            await doc.ref.update({text: 'You have been banned for being a naughty person and saying, ${cleaned}'});
            await authorities.collection('banned').doc(uid).set({});
        }

    });