import { Injectable } from "@angular/core";
import {delay, map, Observable, of} from "rxjs";
import { IBook } from "../interfaces/book.interface";

@Injectable({ providedIn: "root" })
export class DataService {
    getBooks_ServerEmulator(query: string): Observable<IBook[]> {
        return of<IBook[]>([
            {
                id: 0,
                name: 'Book 0',
                pageCount: 0
            },
            {
                id: 1,
                name: 'Book 1',
                pageCount: 0
            }
        ]).pipe(
            map(books => books.filter(x => x.name.includes(query))),
            delay(2000)
        )
    }
}