import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { title } from 'process';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  constructor( private route: ActivatedRoute, private taskservice: TaskService, private router: Router ) { }

  ListId: string;

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
        this.ListId = params.ListId;
    })
  }
  
  updateList(title:string )
  {
    this.taskservice.updateList(this.ListId,title).subscribe(()=>{
      this.router.navigate(['/lists',this.ListId]);
    })
  }

}
