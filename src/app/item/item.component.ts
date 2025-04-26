import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Item } from "../models/item";
import { NgIf } from "@angular/common";
import { CrudClientService } from "../services/crud-client.service";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [NgIf],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

  constructor(private httpService:CrudClientService){};

  editable = false;

  @Input()
  item!: Item;
  @Input()
  newItem!: string;
  @Output() remove = new EventEmitter<Item>();

  saveItem(name: string) {
    if (!name) return;
    this.editable = false;
    this.item.name = name;
    this.putData();
  }

  check(){
    this.item.done = !this.item.done;
    this.putData();
  }

  putData(){
    this.httpService.putData(this.item)?.subscribe({
      next:(data:any|null) => {
        console.log(data);
      },
      error: error => {console.log(error);}
    });
  }

}
