export const environment = {
  production: true,
  mapBoxToken: 'pk.eyJ1IjoieWltb24yMCIsImEiOiJja3VkMjgxNngxNmRoMnVxbGhidDJ1bW95In0.jNiHNTH3ZZKZuxqQ_LnxRA',
  firebase: {
    apiKey: "AIzaSyCdjN7-7u6sEwDSrmFvE9R__zMFfDd7B1A",
    authDomain: "geoen-ff033.firebaseapp.com",
    projectId: "geoen-ff033",
    storageBucket: "geoen-ff033.appspot.com",
    messagingSenderId: "786629739060",
    appId: "1:786629739060:web:c35d4d7f6ffe692e3d4061"
  },
  typeOfAlert: {
    INSTANT_MESSAGE: 'INSTANT_MSG',
    VOICE_MESSAGE: 'VOICE_MSG'
  },
  shareUrl: 'https://monitoreo.vercel.app/monitoring',
  socketConfig: { url: 'https://sockets-geoen.herokuapp.com', options: {} }
};
