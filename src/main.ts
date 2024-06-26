import { Component, OnInit, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import {BooksStore} from "./services/books.store";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
      <div>
          @for (book of booksStore.sortedBooks(); track book.id) {
              <div>
                  <div>{{ book.name }}ss</div>
              </div>
          }
      </div>
      <button (click)="test()">test</button>
      <div>{{ booksStore | json }}</div>
  `,
  imports: [
    JsonPipe
  ]
})
export class App implements OnInit{

  booksStore = inject(BooksStore);

  ngOnInit() {
    const query = this.booksStore.filter.query;
    this.booksStore.loadByQuery(query);
  }

  test() {
  }
}

bootstrapApplication(App);
