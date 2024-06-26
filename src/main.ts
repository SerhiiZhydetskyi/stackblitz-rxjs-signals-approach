import { Component, OnInit, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
})
export class App implements OnInit {
  dataService = inject(DataService)
  name = 'RxJS signals approach';
  
  test() {
    this.dataService.books$.subscribe(books => {
      alert(books |> JSON)
    })
  }
}

bootstrapApplication(App);
