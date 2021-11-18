// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'geoen-ff033',
    appId: '1:786629739060:web:c35d4d7f6ffe692e3d4061',
    databaseURL: 'https://geoen-ff033-default-rtdb.firebaseio.com',
    storageBucket: 'geoen-ff033.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCdjN7-7u6sEwDSrmFvE9R__zMFfDd7B1A',
    authDomain: 'geoen-ff033.firebaseapp.com',
    messagingSenderId: '786629739060',
  },
  production: false,
  mapboxUrl: 'pk.eyJ1IjoieWltb24yMCIsImEiOiJja3VkMjgxNngxNmRoMnVxbGhidDJ1bW95In0.jNiHNTH3ZZKZuxqQ_LnxRA',
  socketConfig: { url: '192.168.1.89:8080', options: {} }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
