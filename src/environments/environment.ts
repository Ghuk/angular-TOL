// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
  	apiKey: "AIzaSyAULgrkxugahyM1fwK2rXQysi4oGT4DF38",
    authDomain: "basededatosapptareas.firebaseapp.com",
    databaseURL: "https://basededatosapptareas.firebaseio.com",
    projectId: "basededatosapptareas",
    storageBucket: "basededatosapptareas.appspot.com",
    messagingSenderId: "377806055554"
  }
};
