import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reusable-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reusable-table.component.html',
  styleUrl: './reusable-table.component.css'
})
export class ReusableTableComponent {
@Input()columns:string[]=[];
@Input()data:any[]=[];

filterText=signal('');
sortColumn=signal('');

sortDirection=signal<'asc'|'dsc'>('asc')

filterAndSortedData=computed(()=>{
  let filtered=this.data.filter(item=>
    Object.values(item).join(' ').toLowerCase().includes(this.filterText().toLowerCase())
  )

  if(this.sortColumn()){
  filtered.sort((a,b)=>{
    const valA=a[this.sortColumn()];
    const valB=b[this.sortColumn()];
    const direction=this.sortDirection()==='asc'?1:-1;
    return (valA>valB ? 1:-1) * direction;
  })}
return filtered;
})

page=signal(1);
pageSize=5;

paginationData=computed(()=>{
  const start=(this.page()-1) * this.pageSize;
  return this.filterAndSortedData().slice(start,start+this.pageSize)
});
onFilterChange(value: string) {
  this.filterText.set(value);
  this.page.set(1);
}

 totalPages = computed(() =>
    Math.ceil(this.filterAndSortedData().length / this.pageSize)
  );
  changeSort(column: string) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection()==='asc'?'dsc':'asc')
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

    goToPage(pageNum: number) {
    this.page.set(pageNum);
  }

  
}
