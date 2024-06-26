import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {IBook} from "../interfaces/book.interface";
import {DataService} from "./data.service";
import {computed, inject} from "@angular/core";
import {debounceTime, distinctUntilChanged, pipe, switchMap, tap} from "rxjs";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {tapResponse} from "@ngrx/operators";


type BooksState = {
    books: IBook[];
    isLoading: boolean;
    filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BooksState = {
    books: [],
    isLoading: false,
    filter: { query: '', order: 'asc' },
};

export const BooksStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ books, filter }) => ({
        booksCount: computed(() => books().length),
        sortedBooks: computed(() => {
            const direction = filter.order() === 'asc' ? 1 : -1;

            return books().sort((a, b) =>
                direction * a.name.localeCompare(b.name)
            );
        }),
    })),
    withMethods((store, dataService = inject(DataService)) => ({
        updateQuery(query: string): void {
            patchState(store, (state) => ({ filter: { ...state.filter, query } }));
        },
        updateOrder(order: 'asc' | 'desc'): void {
            patchState(store, (state) => ({ filter: { ...state.filter, order } }));
        },
        loadByQuery: rxMethod<string>(
            pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(() => patchState(store, { isLoading: true })),
                switchMap((query) => {
                    return dataService.getBooks_ServerEmulator(query).pipe(
                        tapResponse({
                            next: (books) => patchState(store, { books }),
                            error: console.error,
                            finalize: () => patchState(store, { isLoading: false }),
                        })
                    );
                })
            )
        ),
    }))
);

