import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];
  selectedListId : string;
  selectedtaskId : string;

  constructor( private taskService: TaskService , private route: ActivatedRoute, private router : Router ) { }

  ngOnInit() {

      this.route.params.subscribe((params: Params)=>{
          if(params._id){
            this.selectedListId = params._id;
            this.taskService.getTasks(params._id).subscribe((tasks: Task[]) =>{
              this.tasks = tasks;
            })
          }
          else{
            this.tasks= undefined;
          }
      })
       /* this.route.params.subscribe((params: Params)=>{
        this.taskService.getTasks(params._id).subscribe((tasks: any[])=>{
          this.tasks = tasks;
      })
    })*/
    this.taskService.getLists().subscribe((lists: List[])=>{
      this.lists = lists;
    })
 }
  onDeleteListClick(){
    this.taskService.deleteList(this.selectedListId).subscribe((res: any)=>{
      this.router.navigate(['/lists'])
      console.log(res);
  })
}
  onDeleteTaskClick(id: string){
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any)=>{
     this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
  })
}

}
