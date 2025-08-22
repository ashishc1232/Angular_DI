import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../services/backend.service';
import { CommonModule } from '@angular/common';
import { ReusableTableComponent } from '../reusable-table/reusable-table.component';

@Component({
  selector: 'app-dynamic-json',
  standalone: true,
  imports: [CommonModule,ReusableTableComponent],
  templateUrl: './dynamic-json.component.html',
  styleUrl: './dynamic-json.component.css'
})
export class DynamicJsonComponent implements OnInit {
  private userServices = inject(UserService)
  users: User[] = []

  ngOnInit() {
    this.userServices.fetchUsers().subscribe(data => this.users = data)
  }



  columns = ['id', 'name', 'email'];
  data = [
    { id: 1, name: 'Amit', email: 'amit@example.com' },
    { id: 2, name: 'Sara', email: 'sara@example.com' },
    { id: 3, name: 'John', email: 'john@example.com' },
    { id: 4, name: 'Nina', email: 'nina@example.com' },
    { id: 5, name: 'Raj', email: 'raj@example.com' },
    { id: 6, name: 'Zara', email: 'zara@example.com' }
  ];
}
