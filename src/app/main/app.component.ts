import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemComponent } from '../item/item.component';
import { Item } from '../models/item';
import { CrudClientService } from '../services/crud-client.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, ItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private httpService:CrudClientService){};

  title = 'todo';

  filter: 'all' | 'active' | 'done' = 'all';

  allItems: Item[] = [];
  
  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter(item => this.filter === 'done' ? item.done : !item.done);
  }

  ngOnInit(){
    this.getItems();
  }

  getItems(){
    this.httpService.getData().subscribe({
      next:(data:any) => {this.allItems = data;},
      error: error => {console.log(error);}
    });
  }

  addItem(name: string) {
    if(!name)return;
    const item:Item = {
      name,
      done: false,
      id: undefined
    };
    this.httpService.postData(item).subscribe({
      next:(data:any|null) => {
        console.log(data);
        if(data!==null)
        this.allItems.unshift(data);
      },
      error: error => {console.log(error);}
    });
  }

  remove(item:Item) {
    if(!item.id)return;
    this.httpService.deleteData(item.id)?.subscribe({
      next:() => {
        this.allItems.splice(this.allItems.indexOf(item), 1);
      },
      error: error => {window.alert(error.error.error);}
    });
  }
}
