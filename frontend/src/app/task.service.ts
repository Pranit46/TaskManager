import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getLists(){
    return this.webReqService.get('lists');
  }

  constructor( private webReqService: WebRequestService) { }
  //here i am sharing a web req to list
  createList(title: string){
   return this.webReqService.post('lists', { title });
  }

  updateList(id:string, title: string){
    return this.webReqService.patch(`lists/${id}`, { title });
   }
 
   updateTask(listId:string, taskId:string, title: string){
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, { title });
   }
 

   deleteList(id:string){
    return this.webReqService.delete(`lists/${id}`);
  }

  deleteTask(ListId:string, taskId: string){
    return this.webReqService.delete(`lists/${ListId}/tasks/${taskId}`);
  }

  getTasks(_id : string){
    return this.webReqService.get(`lists/${_id}/tasks`);
  }

    //here i am sharing a web req to task
  createTask(title: string, _id:string){
      return this.webReqService.post(`lists/${_id}/tasks`, { title });
     }
}
