// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loadgif: "https://ppllabs.com/wp-content/uploads/2018/10/load.gif",
  error: "https://firebasestorage.googleapis.com/v0/b/zal1000.appspot.com/o/LinkImages%2F1200px-Flat_cross_icon.svg.png?alt=media&token=066c44c3-c03c-4fee-b6c6-16ce1e8e5f73",
  noimg: "https://firebasestorage.googleapis.com/v0/b/zal1000.appspot.com/o/LinkImages%2Fstonks.png?alt=media&token=92675101-924c-4540-b954-d808cb0dacbb",
  apiurl: "http://localhost:8081",
  showConsole: true,
  firebaseconfig: {
    apiKey: "AIzaSyDhjZEv-cPgDn9kDlb6fcN7V0eOceWCR5k",
    authDomain: "zal1000.firebaseapp.com",
    databaseURL: "https://zal1000.firebaseio.com",
    projectId: "zal1000",
    storageBucket: "zal1000.appspot.com",
    messagingSenderId: "512279358183",
    appId: "1:512279358183:web:484cbc7165c35c80541042",
  },
  stripekey: "pk_test_JNslOhJrjMGLcJQj9Rbl7Fpn",
  stripeids: {
    reggeltbotsub: "price_1IC5z5I6tCame7CcGpWVH4dI"
  },
  zalapi: "http://localhost:8080",
  dcauthurl: "https://discord.com/api/oauth2/authorize?client_id=737849483194269818&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fconsole&response_type=code&scope=identify%20email"
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
