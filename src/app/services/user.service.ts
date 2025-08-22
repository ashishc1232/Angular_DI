import { Injectable } from '@angular/core';
import { BackendService, User } from './backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private backend:BackendService) { }
  fetchUsers():Observable<User[]>{
    return this.backend.getUsers();
  }
}
