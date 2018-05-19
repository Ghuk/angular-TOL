import { Component, OnInit } from '@angular/core';
import { TolService } from '../services/tol.service';
import { FirebaseAuth } from '@firebase/auth-types';

import { BrowserQRCodeReader, VideoInputDevice } from '@zxing/library';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  todoListArray: any[];
  gameListArray: any[];
  codigoSala:number;
  
  sensores: Array<any> = [{
    "sensorName": "Acelerometro",
    "sensorIcon": "fas fa-expand-arrows-alt",
    "sensorState": "DeviceMotionEvent" in window,
    "sensorValue": ""
  },
  {
    "sensorName": "Giroscopio",
    "sensorIcon": "fas fa-sync",
    "sensorState": "DeviceMotionEvent" in window,
    "sensorValue": ""
  },
  {
    "sensorName": "Magnetometro",
    "sensorIcon": "fas fa-magnet",
    "sensorState": "DeviceMotionEvent" in window,
    "sensorValue": ""
  },
  {
    "sensorName": "Luz",
    "sensorIcon": "fas fa-sun",
    "sensorState": "ondevicelight" in window,
    "sensorValue": ""
  },
  {
    "sensorName": "Proximidad",
    "sensorIcon": "fas fa-arrows-alt-h",
    "sensorState": "ondeviceproximity" in window,
    "sensorValue": ""
  }];
  //ng serve --host=172.16.58.162
  constructor(private tolService:TolService) { }

  ngOnInit() {
    //Se genera un numero random
    let codigoSalaNuevo;
    codigoSalaNuevo = this.generateNewCode();
    this.codigoSala = codigoSalaNuevo;
    this.addNewRoom(codigoSalaNuevo);

  	this.tolService.getGameList().snapshotChanges()
      .subscribe(item=>{
        this.gameListArray = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.gameListArray.push(x);
        });
      })
  }

  anonymousLogin(){
    this.tolService.anonymousLogin();
  }
  
  addTodo(codigoSalaIngresado){
  		this.tolService.addTodo(codigoSalaIngresado);
  		//itemTitle.value = null;
  }

  //CodigoSala para generar un numero de 6 digitos random
  generateNewCode(){
    let codigoSalaGenerado = Math.floor(Math.random()*900000) + 100000;
    return codigoSalaGenerado;
  }
  
  addNewRoom(codigoSalaNuevo){
    this.tolService.addNewRoom(codigoSalaNuevo);
  }

  addNewDevice(codigoSalaIngresado){
    let codigoCelular = this.generateNewCode();
    this.tolService.addNewDevice(this.sensores,codigoSalaIngresado.value, codigoCelular);
  }

}
