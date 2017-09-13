// Import the Firebase SDK for Google Cloud Functions.
const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/**
 * Runs when a new user is created. Creates the user in the users collections with an empty courses list.
 */
exports.createUserData = functions.auth.user().onCreate((event) => {
  const user = event.data;

  console.log(`New user authenticated. Uid = ${user.uid}`);
  return admin.database().ref(`users/${user.uid}`).set({
    courses: [],
  }).then(() => {
    console.log('Created user in collection succesfully.')
  });
});
