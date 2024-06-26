import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";
import { IBook } from "../interfaces/book.interface";

@Injectable({ providedIn: "root" })
export class DataService {
    books$ = of<IBook[]>([
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
        delay(1000)
    )
}