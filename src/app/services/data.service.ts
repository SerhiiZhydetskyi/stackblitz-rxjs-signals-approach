import {Injectable} from "@angular/core";
import {delay, map, Observable, of} from "rxjs";
import {IBook} from "../interfaces/book.interface";

@Injectable({providedIn: "root"})
export class DataService {

    private books: IBook[] = [
        {
            id: 0,
            name: 'Book 0',
            pageCount: 0
        },
        {
            id: 1,
            name: 'Book 1',
            pageCount: 0
        },
        {
            id: 2,
            name: 'Book 2',
            pageCount: 0
        },
        {
            id: 3,
            name: 'Book 22',
            pageCount: 0
        },
        {
            id: 4,
            name: 'Book 222',
            pageCount: 0
        }
    ];

    getBooks_ServerEmulator(): Observable<IBook[]> {
        return of<IBook[]>(this.books).pipe(
            delay(2000)
        );
    }

    addBook(book: IBook): Observable<IBook> {
        this.books.push(book);
        return of(book).pipe(
            delay(2000)
        );
    }

    removeBook(id: number): Observable<number> {
        const index = this.books.findIndex(x => x.id === id);
        if(index >= 0) {
            this.books.splice(index, 1);
        }

        return of(id).pipe(
            delay(2000)
        )
    }
}