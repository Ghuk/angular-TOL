import { Injectable } from '@angular/core';

import {AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { AngularFireAuth} from 'angularfire2/auth'

import * as firebase from 'firebase/app';

@Injectable()
export class TolService {

  todoList: AngularFireList<any>;
  gameList: AngularFireList<any>;
  authState: any = null;

  constructor(private firebasedb: AngularFireDatabase, public afAuth: AngularFireAuth) {
	this.afAuth.authState.subscribe((auth) => {
		this.authState = auth
	  });
   }

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
    .then((user) => {
      this.authState = user
	  this.updateUserData()
	  console.log("Epa");
    })
    .catch(error => console.log(error));
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  private updateUserData(): void {
	// Writes user name and email to realtime db
	// useful if your app displays information about users or for admin features
	  let path = `users/${this.currentUserId}`; // Endpoint on firebase
	  let data = {
					email: this.authState.email,
					name: this.authState.displayName
				  }
  
	  this.firebasedb.object(path).update(data)
	  .catch(error => console.log(error));
  
	}

  getTodoList(){
  	this.todoList = this.firebasedb.list('nodes');
  	return this.todoList;	
  }
  
  getGameList(){
	return this.gameList = this.firebasedb.list('games');
  }
  
  addDevice(sensors,codigo){
	
	this.todoList.push(
		
		{codigo:{
		nombre:"",
		sensores:{
			acelerometro:{
				estado:sensors[0].sensorState,
				valor:sensors[0].sensorValue},
			giroscopio:{
				estado:sensors[1].sensorState,
				valor:sensors[1].sensorValue},
			magnetometro:{
				estado:sensors[2].sensorState,
				valor:sensors[2].sensorValue},
			luz:{
				estado:sensors[3].sensorState,
				valor:sensors[3].sensorValue},
			proximidad:{
				estado:sensors[4].sensorState,
				valor:sensors[4].sensorValue},
		}
	  }});
  }

  addNewCode(codigo:number){
    this.firebasedb.list('games/'+codigo).push({
		devices:{},
		estado:"esperando"
		
	});
  }

  addNewRoom(codigoSalaNuevo:number){
	this.firebasedb.list('games/'+codigoSalaNuevo).push({});
  }

  addNewDevice(sensor, codigoSala, codigoCelular){
	console.log(codigoSala);
	this.firebasedb.list('games/'+codigoSala+'/devices/').push(
		{codigoCelular:{
		nombre:"",
		sensores:{
			acelerometro:{
				estado:sensor[0].sensorState,
				valor:sensor[0].sensorValue},
			giroscopio:{
				estado:sensor[1].sensorState,
				valor:sensor[1].sensorValue},
			magnetometro:{
				estado:sensor[2].sensorState,
				valor:sensor[2].sensorValue},
			luz:{
				estado:sensor[3].sensorState,
				valor:sensor[3].sensorValue},
			proximidad:{
				estado:sensor[4].sensorState,
				valor:sensor[4].sensorValue},
		}
	}});
  }

  addTodo(codigo:number){
		this.todoList.push({
      codigo:codigo,
      nombre:"",
      sensores:{magnetometro:{disponible:true,valor:""},
            acelerometro:{disponible:false,valor:""},
            luz:{disponible:false,valor:""},
            distancia:{disponible:false,valor:""},
            camara:{disponible:false,valor:""},
            microfono:{disponible:false,valor:""},
            giroscopio:{disponible:false,valor:""}
      }
    });
		
  }

  updateTodo($key:string, flag:boolean){
  	this.todoList.update($key, {isChecked: flag});
  }

  deleteTodo($key){
  	this.todoList.remove($key);
  }
}
