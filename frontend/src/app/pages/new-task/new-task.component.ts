import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route:ActivatedRoute,private router: Router) { }

  _id:string;

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this._id = params['_id'];
      console.log(this._id);
      
    })
  }



  createTask( title:string){
    this.taskService.createTask(title,this._id).subscribe((newTask:Task)=>{
      console.log(newTask);
      this.router.navigate(['../'],{ relativeTo: this.route });
      
    });
  }
}
