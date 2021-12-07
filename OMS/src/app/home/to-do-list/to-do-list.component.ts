import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  indice : number = 0;
  taskList : Map<String,{text:String, isCheck:boolean}> = new Map();
  constructor() { }

  ngOnInit(): void {
  }
  addTask(): void {
    let elt = document.getElementById("toDoList");
    let str : String = 'task '+(this.indice);
    if(elt == null) return ;
    elt.innerHTML += '<div class="taskBox" id="task'+(this.indice)+'">'
                        +'<div>'
                          +'<div class="checkbox"></div>'
                          +'<div class="task">'
                          + str
                          +'</div>'
                        +'</div>'
                        +'<div class="deleteTask" (click)="this.deleteTask('+this.indice+')">'
                          +'<img src="assets/img/toDoList/trash-fill.svg" width=30px/>'
                        +'</div>'
                        +'</div>'
                      +'</div>'
                    +'</div>';
                    
    this.taskList.set(this.indice.toString(),{text : str,isCheck : false});
    this.indice++;
    console.log(this.taskList);
  }
  deleteTask(num : Number):void{
    alert(num);
  }

}
