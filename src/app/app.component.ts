import {Component, inject} from '@angular/core';
import 'zone.js';
import {JsonPipe} from "@angular/common";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {BookStore} from "./stores/book.store";
import {ReactiveFormsModule} from "@angular/forms";
import {RandomHelper} from "./helpers/random.helper";
import {IBook} from "./interfaces/book.interface";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        JsonPipe,
        MatList,
        MatDivider,
        MatListItem,
        MatProgressSpinner,
        ReactiveFormsModule
    ],
    providers: [BookStore],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    bookStore = inject(BookStore);

    addBook() {
        this.bookStore.add({
            id: RandomHelper.getRandomInt(10000, 99999),
            name: RandomHelper.getRandomString(5),
            pageCount: 0
        })
    }

    removeBook(book: IBook) {
        this.bookStore.remove(book);
    }
}
