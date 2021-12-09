import { ClassMethod } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  indice : number = 0;
  taskList : Map<String,{text: String, isCheck:boolean}> = new Map();
  selectedNum :(number | null) = null;
  selectedTaskbox :  (HTMLElement | null) = null;
  selectedTask : (HTMLElement | null) = null;
  listenerSelectedTask : any;
  constructor() { }

  ngOnInit(): void {
    this.listenerSelectedTask = function(event:any){
      if(this.selectedTask!=null && this.selectedNum!=null){
        let key =null;
        if(event.keyCode>=32 && event.keyCode<= 126)
          key = event.key
        else if(event.shiftKey && event.keyCode>=48 && event.keyCode<=52){
          key = String.fromCharCode(event.keyCode-13);
        }
        else if(event.keyCode==8)
          this.selectedTask.innerHTML = this.selectedTask.innerHTML.substring(0,this.selectedTask.innerHTML.length-1);
          if(key!=null){
          if(this.selectedTask.innerHTML.length%80==0 && this.selectedTask.innerHTML.length!=0)
            this.selectedTask.innerHTML+=String.fromCharCode(13)
          this.selectedTask.innerHTML+=key;
        }
        let elt = this.taskList.get(this.selectedNum.toString());
        if(elt!=null)
          elt.text =""+this.selectedTask.innerHTML;
      }
    };
    document.addEventListener("keydown",this.listenerSelectedTask.bind(this));
  }
  addTask(): void {
    let elt = document.getElementById("toDoList");
    if(elt == null) return ;
    let str : String = 'task '+(this.indice);
    let task = document.createElement('div');
    task.className = "taskBox";
    task.id = "taskbox"+(this.indice);
    task.innerHTML='<div class="d-flex flex-row">'
                      +'<div style="margin-right:5px;">'+this.indice+' : </div>'
                      +'<div class="task" id="task'+this.indice+'">'
                      + str
                      +'</div>'
                    +'</div>'
                    +'<div class="d-flex flex-row">'
                      +'<div class="checkTask" id="checktask'+ this.indice +'">'
                        +'<img src="assets/img/toDoList/check-square.svg" width=30px/>'
                      +'</div>'
                      +'<div class="deleteTask" id="deleteButton'+ this.indice+'">'
                        +'<img src="assets/img/toDoList/trash-fill.svg" width=30px/>'
                      +'</div>';
                    +'</div>'
    elt.append(task);
    let changeTaskText = ToDoListComponent.prototype.changeTaskText;
    task.onclick = changeTaskText.bind(this,this.indice);
    let deleteButton = document.getElementById("deleteButton"+this.indice);
    if(deleteButton!=null){
      let cm = ToDoListComponent.prototype.deleteTask;
      deleteButton.onclick = cm.bind(this,this.indice);
    }
    let checkButton = document.getElementById("checktask"+this.indice);
    if(checkButton!=null){
      let checkfunction = ToDoListComponent.prototype.checkTask;
      checkButton.onclick = checkfunction.bind(this,this.indice);
    }
                    
    this.taskList.set(this.indice.toString(),{text : str,isCheck : false});
    
    this.indice++;
  }

  deleteTask(num : Number):void{
    document.getElementById("taskbox" + num)?.remove();
    this.taskList.delete(num.toString());
  }

  checkTask(num : Number):void{
    let task = document.getElementById("task" + num);
    let text = task?.innerHTML;
    if(task!=null){
      task.innerHTML = '<div class="check"> '
                      +this.taskList.get(num.toString())?.text
                      +'</div>';
      let elt =  this.taskList.get(num.toString());
      if(elt!=null)
        elt.isCheck = true;
      let checkButton = document.getElementById("checktask" + num);
      if(checkButton!=null){
        checkButton.className = "unCheckTask";
        let img = document.createElement('img');
        img.src = "assets/img/toDoList/x.svg";
        img.width = 30;
        checkButton.innerText="";
        checkButton.append(img);
        let unCheckfunction = ToDoListComponent.prototype.unCheckTask;
        checkButton.onclick = unCheckfunction.bind(this,num);
      }
    }
  }
  unCheckTask(num : Number):void{
    let task = document.getElementById("task" + num);
    if(task!=null)
      task.innerHTML = ""+this.taskList.get(num.toString())?.text;
    let checkButton = document.getElementById("checktask"+num);
    let elt =  this.taskList.get(num.toString());
    if(elt!=null)
        elt.isCheck = true;
    if(checkButton!=null){
      checkButton.className = "checkTask";
      let img = document.createElement('img');
      img.src = "assets/img/toDoList/check-square.svg";
      img.width = 30;
      checkButton.innerText="";
      checkButton.append(img);
      let checkfunction = ToDoListComponent.prototype.checkTask;
      checkButton.onclick = checkfunction.bind(this,num);
    }
  }
  changeTaskText(num: number):void{
    if(this.selectedTaskbox!=null){
      this.selectedTaskbox.className = "taskBox";
    }
    this.selectedNum = num;
    this.selectedTaskbox = document.getElementById("taskbox"+num);
    this.selectedTask = document.getElementById("task"+num);
    if(this.selectedTaskbox!=null){
      this.selectedTaskbox.className = "selectedTaskBox";
    }
      
  }

}
