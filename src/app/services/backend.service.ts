import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

private users: User[] = [
{ id: 1, name: "Ashish" },
  ]
getUsers(): Observable < User[] > {
  return of(this.users)
}
}
