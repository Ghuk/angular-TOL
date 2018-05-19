import { Component, OnInit } from '@angular/core';
import { TolService } from '../services/tol.service';

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  todoListArray: any[];

  constructor(private tolService:TolService) { }
  
  ngOnInit() {
    
  }
  /*ngOnInit() {
    this.tolService.getTodoList().snapshotChanges()
      .subscribe(item=>{
        this.todoListArray = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.todoListArray.push(x);
        });
      })
  }

  addTodo(codigo){
  		this.tolService.addTodo(codigo);
  		//itemTitle.value = null;
  }*/

}
